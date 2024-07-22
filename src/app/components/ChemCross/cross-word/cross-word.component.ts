import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';
import { CrossCellComponent } from "../cross-cell/cross-cell.component";
import { CommonModule } from '@angular/common';
import { Target } from '@angular/compiler';
import { crossWordCollection, wordCollection } from 'app/interfaces/elements';
import { WordLogComponent } from "../word-log/word-log.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cross-word',
  standalone: true,
  imports: [CrossCellComponent, CommonModule, WordLogComponent, FormsModule],
  templateUrl: './cross-word.component.html',
  styleUrl: './cross-word.component.scss'
})
export class CrossWordComponent implements OnInit, AfterViewInit {

  
  
  cellsCollection: HTMLInputElement[] = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];
  txtConsole = document.getElementById("txtConsole") as HTMLInputElement;
  txtFilter = document.getElementById("filter") as HTMLInputElement;
  wordLog = document.getElementById("wordLog") as HTMLInputElement;
  wordLogList: string[] = [];
  
  wordsSet = new Set();
  UsedWordsSet = new Set();
  initialCellHeight = 30;
  @Input() cellHeight = this.initialCellHeight;
  crossSize = 10;
  blockChar = "@";
  positionMethod = 0; //Determina el metodo a usar para obtener la celda para probar las palabras
  filledCells = 0;    //Cantidad de celdas con letras o blockChar
  totalIterations = 0;
  totalCrossWords = crossWordCollection.length;
  
  // Direccion inicial para colocar palabras
  currentDirection = 0;
  
  crossWord = new Array();

  AvailabeWordsSet = new Set();
  
  fakeArray: number[] = new Array(this.crossSize);
  idArray: number[] = new Array(this.crossSize * this.crossSize);
  
  // @HostBinding('--cellHeight')
  // cellHeight = '100px';
  
  constructor() {
    
    // alert();
    
    document.addEventListener("DOMContentLoaded", this.AsignId);
    
    
  }
  
  ngOnInit(): void {
    // alert("OnInit");
    this.LoadAvailableWords();
    this.GenerateCrossW();
    this.LoadCrossWord(1);
    this.FilterWords();
  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.CrossZoom();
    
  }

  ChangeZoom(e: Event) {
    this.CrossZoom(Number((e.target as HTMLInputElement).value))
  }
  
  CrossZoom(zoom:number = 30) {
    // let myInput = e?.target as HTMLInputElement;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    let cellHeight: string = zoom + "px";
    let fontSize: string = (zoom * 0.6) + "px";
    let headingFontSize: string = (zoom * 0.2) + "px";

    for (const c of this.cellsCollection) {
      c.style.height = cellHeight;
      c.style.width = cellHeight;
      c.style.fontSize = fontSize;
      (c.parentElement!.parentElement!.children[0] as HTMLDivElement).style.fontSize = headingFontSize;
      c.parentElement!.parentElement!.style.height = cellHeight;
    }
  }
  
  GenerateCrossW(): void {

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



  ExtractCrossWord() {
    let i: number = 0;
    let j: number = 0;

    for (const c of this.cellsCollection) {
      this.crossWord[i][j] = c.value;

      j++;

      if (j == this.crossSize) {
          j = 0;
          i++;
      }
  }
  }

  /**
   * Updates the list of words of the log
   * 
   */
  UpdateWordLogList() {
    this.wordLogList = this.GetUsedWodsList();
    this.FilterWords();
  }

    /**
   * Loads the set of available words
   * 
   */
  LoadAvailableWords() {
    wordCollection.forEach((c) => {
      this.AvailabeWordsSet.add(c[0]);
      this.AvailabeWordsSet.add(c[2]);
    });
  }

      /**
   * Verifies if word is in AvailableWordSet
   * 
   */
  IsWord(s: string):boolean {
    
    return this.AvailabeWordsSet.has(s);

  }

  /**
 * List words placed in the Cross Word.
 * @param separator The parameter name.
 * @returns An array of words in the Cross Word.
 */
  GetUsedWodsList(separator:string = ",", sorted:boolean=true): string[] {
    let i: number = 0;
    let j: number = 0;
    let letter: string;
    let word: string = "";
    let str: string = "";
    let lastLetter = "";
    let wordListSet = new Set();
    let usedWordList: string[] = [];

    //Clean UsedWordsSet
    this.UsedWordsSet.clear();

    //Extract the words from CrossWord
    this.ExtractCrossWord();

    //Horizontal iteration
    for (let i = 0; i < this.crossSize; i++) {
      for (let j = 0; j < this.crossSize; j++) {
        letter = this.crossWord[i][j];

        if (letter == "" || letter == "@") {
          if(this.IsWord(word)){
            this.UsedWordsSet.add(word);
          }
          word = "";
          continue;
        }
      
        lastLetter = letter;
        word += letter;

        if (j + 1 == this.crossSize) {
          if(this.IsWord(word)){
            this.UsedWordsSet.add(word);
          }
          word = "";
        }
      
      }
    }

    //Vertical iteration
    for (let j = 0; j < this.crossSize; j++) {
      for (let i = 0; i < this.crossSize; i++) {
        letter = this.crossWord[i][j];

        if (letter == "" || letter == "@") {
          if(this.IsWord(word)){
            this.UsedWordsSet.add(word);
          }
          word = "";
          continue;
        }

        lastLetter = letter;
        word += letter;
        
        if (i + 1 == this.crossSize) {
          if(this.IsWord(word)){
            this.UsedWordsSet.add(word);
          }
          word = "";
        }
      
      }
    }


    this.UsedWordsSet.forEach((c) => usedWordList.push(c as string));

    // word = word.replaceAll(`<div class="hintWord"></div>`, "");

    // this.wordLog = document.getElementById("wordLog") as HTMLInputElement;
    // this.wordLog.innerHTML = word;

    return usedWordList.sort();
  }

   /**
 * List words placed in the Cross Word.
 * @param separator The parameter name.
 * @returns An array of words in the Cross Word.
 */
  DrawWordLog(wordList: string[]) {
     
   }


  DrawCrossWord() {

    console.log("Iniciando");

    // RandomCrossWFill();

    let i: number = 0;
    let j: number = 0;
    let k: number = 1;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];


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
    this.txtConsole = document.getElementById("txtConsole") as HTMLInputElement;
    let str = this.txtConsole.value;

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
    this.UpdateWordLogList();

}


  public LoadCrossWord(id?:number) {

    let i = 0;
    let j = 0;
    let idCrossWord: number;

    if (!id) {
      let cross_id = document.getElementById("cross_id") as HTMLInputElement;
      idCrossWord = Number(cross_id.value);
    } else {
      idCrossWord = id;
    }


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
    this.UpdateWordLogList();

  }


  RandomCrossWFill() {

    console.log("Iniciando");

    //this.GenerateCrossW();

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
    let letter = new RegExp(this.txtFilter.value, "i");
    let str = "";
    let strSymbols = ""

    // Refresh UsedWordList
    this.GetUsedWodsList();
    // this.UpdateWordLogList(); //TODO: REVISAR

    for (const c of wordCollection) {

      //If the word is already used i will not be shown
      // if (this.UsedWordsSet.has(c[0]) || this.UsedWordsSet.has(c[2])) {
      //   continue;
      // }

      if ((c[0] as string).search(letter) != -1 && !this.UsedWordsSet.has(c[0])) {
        str += `<div class="hintWord">${c[0]}</div>`;
      }
      if ((c[2] as string).search(letter) != -1 && !this.UsedWordsSet.has(c[2])) {
        str += `<div class="hintSymbol">${c[2]}</div>`;
      }
    }

    document.getElementById("wordHints")!.innerHTML = str;
    // document.getElementById("symbolHints")!.innerHTML = strSymbols;

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
