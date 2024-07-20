import { Component } from '@angular/core';
import { CrossCellComponent } from "../cross-cell/cross-cell.component";
import { CommonModule } from '@angular/common';
import { Target } from '@angular/compiler';
import { crossWordCollection, wordCollection } from 'app/interfaces/elements';

@Component({
  selector: 'app-cross-word',
  standalone: true,
  imports: [CrossCellComponent, CommonModule],
  templateUrl: './cross-word.component.html',
  styleUrl: './cross-word.component.scss'
})
export class CrossWordComponent {


  cellsCollection: HTMLInputElement[] = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];;
  txtConsole = document.getElementById("txtConsole") as HTMLInputElement;
  txtFilter = document.getElementById("filter") as HTMLInputElement;
  wordLog = document.getElementById("wordLog") as HTMLInputElement;

  wordsSet = new Set();
  UsedWordsSet = new Set();
  crossSize = 10;
  blockChar = "@";
  positionMethod = 0; //Determina el metodo a usar para obtener la celda para probar las palabras
  filledCells = 0;    //Cantidad de celdas con letras o blockChar
  totalIterations = 0;

  // Direccion inicial para colocar palabras
  currentDirection = 0;

  crossWord = new Array();

  fakeArray: number[] = new Array(this.crossSize);
  idArray: number[] = new Array(this.crossSize * this.crossSize);


  constructor() {

    // alert();

    document.addEventListener("DOMContentLoaded", this.AsignId);


  }

  public GenerateCrossW(): void {

    //Generar matriz n x n
    this.crossWord = new Array(this.crossSize);
    for (let i = 0; i < this.crossSize; i++) {
      this.crossWord[i] = new Array(this.crossSize);

      for (let j = 0; j < this.crossSize; j++) {
        this.crossWord[i][j] = "";

      }
    }
  }


  // Asigna el ID a cada celda
  AsignId() {

    // alert("Asigna el ID a cada celda");

    let id: number = 1;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    let cellHeadings = Array.from(document.getElementsByClassName("cell-heading")) as HTMLInputElement[];


    for (const c of this.cellsCollection) {
      if (c instanceof HTMLInputElement) {

        c.id = (id++).toString();
      }

    }

    id = 1;

    for (const c of cellHeadings) {
      c.innerHTML = (id++).toString();
    }

    this.GenerateCrossW();
  }


  DblClick(e: any) {
    e.target.value = "";
  }

  OnBlur(e: any) {
    e.target.value = e.target.value.toUpperCase();

    if (e.target.value === this.blockChar) {
      e.target.parentElement.parentElement.className = "blackCell";
      e.target.style.backgroundColor = "black";
      // c.style.color = "yellow";
    } else {
      e.target.parentElement.parentElement.className = "cell";
      e.target.style.backgroundColor = "white";
      // c.style.color = "";
    }
  }


  DrawCrossWord() {

    console.log("Iniciando");

    // RandomCrossWFill();

    let i: number = 0;
    let j: number = 0;
    let k: number = 1;


    for (const c of this.cellsCollection) {
      c.value = this.crossWord[i][j];
      c.parentElement?.parentElement?.children[0]?.setAttribute('innerHTML', k.toString());

      if (c.value === this.blockChar) {
        c.parentElement?.parentElement?.classList.add("blackCell");
        c.style.backgroundColor = "black";
      } else {
        c.parentElement?.parentElement?.classList.add("cell");
        c.style.backgroundColor = "white";
      }

      j++;
      k++;

      if (j === this.crossSize) {
        j = 0;
        i++;
      }
    }

  }

  public ExportCrossW() {
    let str = "[";
    this.txtConsole = document.getElementById("txtConsole") as HTMLInputElement;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    for (const c of this.cellsCollection) {
      str += '\"' + c.value + '\"' + ",";
    }

    str += "]";

    str = str.replace(",]", "]");

    this.txtConsole!.value = str;


  }


  ImportCrossW(){
    let str = this.txtConsole.value;
    this.txtConsole = document.getElementById("txtConsole") as HTMLInputElement;

    //Eliminar [" y ]
    str = str.substring(2, str.length-2);
    let crossArray = str.split('","');

    let i = 0;
    let j = 0;

    this.crossSize = Math.sqrt(crossArray.length);
    this.GenerateCrossW();

    for (const c of crossArray) {
        this.crossWord[i][j] = c;

        j++;

        if (j == this.crossSize) {
            j = 0;
            i++;
        }
    }

    this.DrawCrossWord();
}


  public LoadCrossWord() {

    let i = 0;
    let j = 0;

    let cross_id = document.getElementById("cross_id") as HTMLInputElement;

    let idCrossWord = Number(cross_id.value);

    this.crossSize = Math.sqrt(crossWordCollection[idCrossWord].length);
    this.GenerateCrossW();

    for (const c of crossWordCollection[idCrossWord]) {
      this.crossWord[i][j] = c;

      j++;

      if (j == this.crossSize) {
        j = 0;
        i++;
      }
    }

    this.DrawCrossWord();

  }


  RandomCrossWFill() {

    console.log("Iniciando");

    for (let i = 0; i < this.crossSize; i++) {

      for (let j = 0; j < this.crossSize; j++) {
        this.crossWord[i][j] = String.fromCharCode(27 * Math.random() + 64);

      }

    }

    // console.table(crossWord);

    this.DrawCrossWord();

  }



  FilterWords() {
    this.txtFilter = document.getElementById("filter") as HTMLInputElement;
    let letter = new RegExp(this.txtFilter.value,"i");
    let str = "";

    for (const c of wordCollection) {
        if ((c[0] as string).search(letter) != -1) {
            str += `<div class="hintword">${c[0]}</div>`;
        }
    }

    document.getElementById("wordHints")!.innerHTML = str;

  }
  
  FillCrossWord() {
    
    let EmptyCells = 5;
    let totalCells = this.crossSize * this.crossSize;
    let str = "";

    let totalIterations = 0;
    let filledCells = 0;

    for (let index = 0; index < 50; index++) {
        
        if (totalCells - filledCells <= EmptyCells) {
            str = `Existen menos de ${EmptyCells} vacias.`;
            break;
        }
        this.FillCrossWord_E1();
        
    }

    str += `Iteraciones: ${totalIterations}`;
    this.DrawCrossWord();
    alert(str);
}

FillCrossWord_E1() {
  //Primer palabra al asar
  let wordList = new Array();
  // let direction = Math.trunc(2 * Math.random()); // 0 - Vertical 1 - Horizontal
  // let direction = 0;
  
  let direction = this.currentDirection;

  if (this.currentDirection == 0) {
      this.currentDirection = 1;
  } else {
      this.currentDirection = 0
  }

  /* */
  
  
  let i = 0;
  let j = 0;
  let r = 0;
  let c = 0;
  let I0 = 0;
  let J0 = 0;

  let bPlaced = false;
  let bChangeWord = false;
  let bRepeatedWord = false;
  let iteration = 1;
  let currIndex = 0;
  let currWord = "";

  // Generar la matriz vacia. Descomentar.
  // GenerateCrossW();

  //TODO: Se puede seleccionar el tamaño de las palabras a usar para rellenar.
  //Llenar lista de palabras disponibles.
  for (const c of wordCollection) {
      wordList.push(c[0]);
  }

  while (!bPlaced) {

      if (iteration++ > 500000) {
          // alert("Maximun quantity of iterations reached!");
          break;
      }

      //METODO 1
      //Si la palabra ya se ha usado se busca otra
      while (!bRepeatedWord) {
          
          //Palabra a colocar
          currIndex = Math.trunc(wordList.length * Math.random());
          
          //Seleccionar la palabra para probar
          currWord = /* blockChar + */ wordList[currIndex] /* + blockChar */;
          // console.log(currWord);

          bRepeatedWord = !this.UsedWordsSet.has(currWord);
          
      }

      //METODO 2
      //Si la palabra ya se ha usado se busca otra
      // while (!bRepeatedWord) {
          
      //     //Palabra a colocar
      //     //currIndex = Math.trunc(wordList.length * Math.random());
          
      //     //Seleccionar la palabra para probar
      //     currWord = /* blockChar + */ wordList[currIndex] /* + blockChar */;
      //     // console.log(currWord);

      //     currIndex++;

      //     bRepeatedWord = !UsedWordsSet.has(currWord);
          
      // }

      switch (this.positionMethod) {
          case 0:
              //Se empieza a iterar en todas las celdas en orden
              
              if (j + 1 == this.crossSize) {
                  j = 0;
                  i++;
              } else {
                  j++;
              }

              if (i + 1 == this.crossSize) {
                  i = 0;
                  j = 0;
                  direction = (direction == 0 ? 1 : 0);
              }

              break;
          case 1:
              //Se determina una posicion aleatoria para inicar la palabra
              i = Math.trunc(this.crossSize * Math.random());
              j = Math.trunc(this.crossSize * Math.random());
              break;
          case 2:
              // TODO: Se usan las celdas que ya tengan letras colocdas
              break;
          case 3:
              // TODO: Se usan las celdas que esten vacias
              break;

          default:
              break;
      }
      

      /*PRUEBA 01 -----------------------------------------------------------------------------*/
     
      // direction = 1;
      // currWord = "TECNECIO";
      // i = 2;
      // j = 1;
      
      
      /*PRUEBA 01 - FIN -----------------------------------------------------------------------*/
      
      
      I0 = i;
      J0 = j;
      

      //Verifica que la palabra quepa en las celdas disponibles
      //dependiendo de la direccion de escritura
      if (direction == 0) {
          if ((this.crossSize-i) < currWord.length) {
              continue;   //Continuar con otra palabra
          }
      } else {
          if ((this.crossSize-j) < currWord.length) {
              continue;   //Continuar con otra palabra
          }
      }

      //TODO:Verificar que hay espacio disponible para colocar
      //Que pasa si hay una letra colocada en una celda que la palabra si lleva?
      r = i;
      c = j;

      for (const w of currWord) {

          //Verificar las celdas disponibles de las palabras
          if (this.crossWord[r][c] == "" || this.crossWord[r][c] == w && this.crossWord[r][c] != this.blockChar) {
              //Todo ok --> verificar siguiente letra
          } else {
              bChangeWord = true; //Cambiar de palabra
          }

          if (direction == 0) {
              r++;
          } else {
              c++;
          }
      }

      //Verificar la posicion anterior y posterior de la palabra

      // Direccion vertical
      if (direction == 0) {

          // Posicion anterior
          if (I0 > 0) {
              if (this.crossWord[I0 - 1][J0] != "" || this.crossWord[I0 - 1][J0] == this.blockChar) {
                  bChangeWord = true; //Cambiar de palabra
              }
          }

          // Posicion posterior
          if (I0 + currWord.length < this.crossSize) {

              if (!(this.crossWord[I0 + currWord.length][J0] == "" || this.crossWord[I0 + currWord.length][J0] == this.blockChar)) {
                  bChangeWord = true; //Cambiar de palabra
              }
          }
      }

      // Direccion horizontal
      if (direction == 1) {

          // Posicion anterior
          if (J0 < this.crossSize) {
              if (this.crossWord[I0][J0 - 1] != "" || this.crossWord[I0][J0 - 1] == this.blockChar) {
                  bChangeWord = true; //Cambiar de palabra
              }

              // Posicion posterior
              if (J0 + currWord.length < this.crossSize) {

                  if (this.crossWord[I0][J0 + currWord.length] != "" || this.crossWord[I0][J0 + currWord.length] != this.blockChar) {
                      bChangeWord = true; //Cambiar de palabra
                  }
              }
          }
      }

      if (bChangeWord) {
          bChangeWord = false; //Reiniciar la variable
          continue;   //Continuar con otra palabra
      }


      //Escribe cada letra de la palabra en crossWord
      for (const w of currWord) {
          this.crossWord[i][j] = w;
          if (direction == 0) {
              i++;
          } else {
              j++;
          }

          this.filledCells++;
      }

      //Se agrega la palabra colocada a la lista de palabras usadas
      this.UsedWordsSet.add(currWord);

      // Se agrega el blockChar al inicio y al final si se puede. Para evitar poner palabras que ocupen esos espacios.
      
      //blockChair al inicio de la palabra
      if (direction == 0) {
          if (I0 > 0) {
              this.crossWord[I0 - 1][J0] = this.blockChar;
              this.filledCells++;
          }
          if (i < this.crossSize) {
              this.crossWord[i][J0] = this.blockChar;
              this.filledCells++;
          }
      } else {
          if (J0 > 0) {
              this.crossWord[I0][J0 - 1] = this.blockChar;
              this.filledCells++;
          }
          if (j < this.crossSize) {
              this.crossWord[i][j] = this.blockChar;
              this.filledCells++;
          }
      }


      //La palabra se pudo colocar sin cortarse
      bPlaced = true;

      this.RefreshWordLog(currWord);


      //Si la palabra se pudo colocar se agrega a la lista de palabras usadas.
      this.wordsSet.add(currWord);
  }

  this.totalIterations = iteration;


}


  ClearCrossWord() {
    this.GenerateCrossW();

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    for (const c of this.cellsCollection) {
      c.value = "";
      c.setAttribute("style", "");
      // c.parentElement.parentElement.className = "cell";

    }

    this.filledCells = 0;
    this.wordLog!.innerHTML = "";
  }

  //Moverse por las celdas usando las flechas
  OnKeyPress(e: Event) {

    let myHTMLInput = e.target as HTMLInputElement;
    const uno = parseInt(myHTMLInput.id);

    let id: number = parseInt(myHTMLInput.id);
    let min: number = 1;
    let max: number = this.crossSize * this.crossSize;


    let mykey = e as KeyboardEvent;

    // alert(mykey.key);


    switch (mykey.key) {
      // Left arrow key
      case "ArrowLeft":
        document.getElementById(id > min ? (id - 1).toString() : min.toString())?.focus();
        break;
      // Up arrow key
      case "ArrowUp":
        document.getElementById(id > this.crossSize ? (id - this.crossSize).toString() : id.toString())?.focus();
        break;
      // Right arrow key
      case "ArrowRight":
        document.getElementById(id < max ? (id + 1).toString() : max.toString())?.focus();
        break;
      // Down arrow key
      case "ArrowDown":
        document.getElementById(id < max - this.crossSize ? (id + this.crossSize).toString() : id.toString())?.focus();
        break;
      default:
        break;
    }


  }



  RefreshWordLog(word:string) {
    this.wordLog = document.getElementById("wordLog") as HTMLInputElement;
    this.wordLog.innerHTML += `<div>${word}</div>`;
}
}
