import { afterRender, AfterRenderPhase, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CrossCellComponent } from "../cross-cell/cross-cell.component";
import { CommonModule } from '@angular/common';
import { crossWordCollection, wordCollection } from 'app/interfaces/elements';
import { WordLogComponent } from "../word-log/word-log.component";
import { FormsModule } from '@angular/forms';
import { Dictionary } from 'app/interfaces/language';
import { LanguageSelectComponent } from "../../language-select/language-select.component";

@Component({
  selector: 'app-cross-word',
  standalone: true,
  imports: [CrossCellComponent, CommonModule, WordLogComponent, FormsModule, LanguageSelectComponent],
  templateUrl: './cross-word.component.html',
  styleUrl: './cross-word.component.scss'
})
export class CrossWordComponent implements OnInit, AfterViewInit, AfterViewChecked {

  msg = Dictionary;
  id_language: number = 0; //0: English 1:Spanish
  cellsCollection: HTMLInputElement[] = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];
  txtConsole = document.getElementById("txtConsole") as HTMLInputElement;
  txtFilter = document.getElementById("filter") as HTMLInputElement;
  wordLog = document.getElementById("wordLog") as HTMLInputElement;
  wordLogList: string[] = [];

  wordsSet = new Set();
  UsedWordsSet = new Set();
  initialCellHeight = 30;
  @Input() cellHeight = this.initialCellHeight;
  cellHeightstr: string = "";
  crossSize = 10;
  blockChar = "@";
  positionMethod = 0; //Determina el método a usar para obtener la celda para probar las palabras
  filledCells = 0;    //Cantidad de celdas con letras o blockChar
  totalIterations = 0;
  totalCrossWords = crossWordCollection.length;

  // Dirección inicial para colocar palabras
  currentDirection = 0;


  crossWord = new Array();

  AvailabeWordsSet = new Set();

  fakeArray: number[] = new Array(this.crossSize);
  idArray: number[] = new Array(this.crossSize * this.crossSize);

  // @HostBinding('--cellHeight')
  // cellHeight = '100px';

  // True when the user changes the CrossWord size.
  sizeChanged = false;

  constructor() {

    // alert();

    document.addEventListener("DOMContentLoaded", () => this.AsignId());

    // afterRender executes the callback 2 times when the CrossWord size is changed. So we need to make it run once. That's what sizeChanged is for.
    afterRender(() => {
      if (this.sizeChanged) {
        this.AsignId();
        this.CrossZoom();
        this.sizeChanged = false;
        // console.log("afterRender");
      }

    }, { phase: AfterRenderPhase.Write });
  }

  /**
   * Blocks all cells in the crossword
   */
  BlockCells() {

    // ask for confirmation
    if (!confirm(this.msg[15][this.id_language])) {
      return;
    }

    /// all cells with a "" value will be blocked
    for (let i = 0; i < this.crossSize; i++) {
      for (let j = 0; j < this.crossSize; j++) {
        if (this.crossWord[i][j] == "") {
          this.crossWord[i][j] = this.blockChar;
        }
      }
    }

    this.DrawCrossWord();
  }


  /**
   * Handles the drop event on the cross-word component.
   * @param {DragEvent} e - The drag event object.
   */
  OnDropOnCross(e: DragEvent) {
    e.preventDefault();
    let data = e.dataTransfer?.getData("text");

    // let columnIndex = Number((e.target as HTMLInputElement).id) % this.crossSize - 1;
    // let rowIndex = Math.trunc(Number((e.target as HTMLInputElement).id) / this.crossSize);

    let columnIndex = Number((e.target as HTMLInputElement).getAttribute("y"));
    let rowIndex = Number((e.target as HTMLInputElement).getAttribute("x"));



    if (e.ctrlKey) {
      // Horizontal direction
      this.currentDirection = 1;
    } else {
      // Vertical direction
      this.currentDirection = 0;
    }

    //
    if (data && data?.length > this.crossSize - (this.currentDirection == 1 ? columnIndex : rowIndex)) {
      alert(this.msg[19][this.id_language] + (this.currentDirection ? this.msg[16][this.id_language] : this.msg[17][this.id_language]));
      return;
    }
    // alert(columnIndex);

    // Check if there is available space to place the word
    // if there is no available space, show an alert and return
    // There is no available space to place the word.
    if (this.IsThereAvailableSpace(data as string, rowIndex, columnIndex, this.currentDirection) == false) {
      alert(this.msg[18][this.id_language]);
      return;
    }


    this.InsertWord(data as string, rowIndex, columnIndex, this.currentDirection);

    // set direction to default
    this.currentDirection = 0;

    this.DrawCrossWord();
    this.UsedWordsSet.add(data as string);
    this.UpdateWordLogList();
  }

  IsThereAvailableSpace(word: string, rowIndex: number, columnIndex: number, direction: number): boolean {
    let r = rowIndex;
    let c = columnIndex;

    for (const w of word) {
      if (this.crossWord[r][c] != "" && (this.crossWord[r][c] as string).toUpperCase() != w.toUpperCase()) {
        return false;
      }

      if (direction == 0) {
        r++;
      } else {
        c++;
      }
    }

    return true;
  }
  

    

  /**
   * Handles the drag over event for the component.
   * Prevents the default behavior of the event.
   * 
   * @param e - The drag over event.
   */
  onDragOver(e:Event){
    e.preventDefault();
  }

  
  /**
   * Inserts a word into the crossword puzzle grid.
   * 
   * @param word - The word to be inserted.
   * @param i - The starting row index.
   * @param j - The starting column index.
   * @param direction - The direction of insertion (0 for vertical, 1 for horizontal).
   */
  InsertWord(word: string, i: number, j: number, direction: number) {
    let r = i;
    let c = j;

    for (const w of word) {
      this.crossWord[r][c] = w;
      if (direction == 0) {
        r++;
      } else {
        c++;
      }
    }
  }

  /**
   * Handles the drop event for the component.
   * Prevents the default behavior of the event.
   * 
   * @param e - The drop event.
   */
  onDrop(e:DragEvent){
    e.preventDefault();
    let data = e.dataTransfer?.getData("text");
    (e.target as HTMLInputElement).value = data as string;
  }

  onDragStart(e: DragEvent) {
    e.dataTransfer?.setData("text", (e.target as HTMLElement).textContent as string);
  }



  /**
   * Handles the resize event of the component.
   * Updates the cross-word size and other related properties.
   */
  onResize() {
    this.sizeChanged = true;
    this.GenerateCrossW();
    this.cellsCollection = [];
    this.fakeArray = new Array(this.crossSize);
    this.cellHeightstr = this.cellHeight + "px";
    // this.AsignId();

    // this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    // afterRender() is called to update cell numbers and zoom
  }

  /**
   * Handles the event when the language is changed.
   * @param id_language - The ID of the selected language.
   */
  onLanguageChanged(id_language: number) {
    this.id_language = id_language;
  }

  ngOnInit(): void {
    // alert("OnInit");
    this.LoadAvailableWords();
    this.GenerateCrossW();
    // this.LoadCrossWord(1);
    this.FilterWords();
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   * This hook is called only once after the first ngAfterContentInit.
   * Use this hook to perform any additional initialization tasks that require the component's view to be fully initialized.
   */
  ngAfterViewInit(): void {
    // alert("ngAfterViewInit");
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.CrossZoom();

  }

  ngAfterViewChecked(): void {
    // alert("ngAfterViewChecked");
  }

  // ChangeZoom(e: Event) {
  //   // this.CrossZoom(Number((e.target as HTMLInputElement).value));
  //   this.CrossZoom();
  // }

  /**
   * Applies zoom effect to the crossword cells and adjusts their sizes and fonts.
   */
  CrossZoom() {
    // let myInput = e?.target as HTMLInputElement;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    let cellHeight: string = this.cellHeight + "px";
    let fontSize: string = (this.cellHeight * 0.6) + "px";
    let headingFontSize: string = (this.cellHeight * 0.2) + "px";

    for (const c of this.cellsCollection) {
      c.style.height = cellHeight;
      c.style.width = cellHeight;
      c.style.fontSize = fontSize;
      (c.parentElement!.parentElement!.children[0] as HTMLDivElement).style.fontSize = headingFontSize;
      c.parentElement!.parentElement!.style.height = cellHeight;
    }

    this.AsignId();
  }

  /**
   * Generates a cross word puzzle by creating an n x n matrix and initializing all cells with an empty string.
   */
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

  getCellsCollection() {

  }



  /**
   * Assigns an ID to each cell.
   */
  AsignId() {

    // alert("Asigna el ID a cada celda");

    let id: number = 1;
    let i: number = 0;
    let j: number = 0;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    let cellHeadings = Array.from(document.getElementsByClassName("cell-heading")) as HTMLInputElement[];


    for (const c of this.cellsCollection) {
      c.id = (id++).toString();
      c.setAttribute("x", (i).toString());
      c.setAttribute("y", (j++).toString());

      if (j == this.crossSize) {
        j = 0;
        i++;
      }
    }

    id = 1;

    for (const c of cellHeadings) {
      c.innerHTML = (id++).toString();
    }
  }


  /**
   * Handles the double click event.
   * Clears the value of the target element.
   * 
   * @param e - The event object.
   */
  OnDoubleClick(e: any) {
    e.target.value = "";
    let columnIndex = Number((e.target as HTMLInputElement).getAttribute("y"));
    let rowIndex = Number((e.target as HTMLInputElement).getAttribute("x"));
    this.crossWord[rowIndex][columnIndex] = "";
    this.UpdateWordLogList();
  }



  /**
   * Validates a cell value.
   * @param cellValue - The value of the cell to validate.
   * @returns A boolean indicating whether the cell value is valid or not.
   */
  ValidateCell(cellValue: string): boolean {

    //Verify is one letter
    if (cellValue.length > 1) return false;

    //Verify is a letter
    // if (Number(cellValue)) return false;

    let regex = new RegExp("[a-zA-ZñÑ@]", "i");

    if (cellValue.search(regex) == -1) return false;


    return true;
  }

  /**
   * Handles the blur event for the input element.
   * @param e - The event object.
   */
  OnBlur(e: any) {

    
    if (!this.ValidateCell(e.target.value)) {
      e.target.value = "";
      return;
    }


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

    this.UpdateWordLogList();
    
  }

  OnChange(e: Event) {
    let i = (e.target as HTMLElement).getAttribute("x");
    let j = (e.target as HTMLElement).getAttribute("y");
    this.crossWord[Number(i)][Number(j)] = (e.target as HTMLInputElement).value.toUpperCase();
    this.UpdateWordLogList();
  }

  temp() {

  }


  /**
   * Extracts the crossword values from the cells collection and populates the crossWord array.
   */
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
   */
  UpdateWordLogList() {
    this.wordLogList = this.GetUsedWodsList();
    this.FilterWords();
  }

  /**
 * Loads the set of available words
 */
  LoadAvailableWords() {
    wordCollection.forEach((c) => {
      this.AvailabeWordsSet.add(c[0]);
      this.AvailabeWordsSet.add(c[2]);
    });
  }

  /**
* Verifies if word is in AvailableWordSet
*/
  IsWord(s: string): boolean {

    return this.AvailabeWordsSet.has(s);

  }

  /**
 * List words placed in the Cross Word.
 * @param separator The parameter name.
 * @returns An array of words in the Cross Word.
 */
  GetUsedWodsList(separator: string = ",", sorted: boolean = true): string[] {
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
          if (this.IsWord(word)) {
            this.UsedWordsSet.add(word);
          }
          word = "";
          continue;
        }

        lastLetter = letter;
        word += letter;

        if (j + 1 == this.crossSize) {
          if (this.IsWord(word)) {
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
          if (this.IsWord(word)) {
            this.UsedWordsSet.add(word);
          }
          word = "";
          continue;
        }

        lastLetter = letter;
        word += letter;

        if (i + 1 == this.crossSize) {
          if (this.IsWord(word)) {
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


  /**
   * Draws the crossword puzzle on the UI based on the provided data.
   */
  DrawCrossWord() {

    // console.log("Iniciando");

    // RandomCrossWFill();

    let i: number = 0;
    let j: number = 0;
    let k: number = 1;

    this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];


    for (const c of this.cellsCollection) {
      c.value = this.crossWord[i][j];
      c.parentElement?.parentElement?.children[0]?.setAttribute('innerHTML', k.toString());

      if (c.value === this.blockChar && c.value != "") {
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


  /**
   * Exports the crossword data as a string array.
   */
  ExportCrossW() {
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


  /**
   * Imports the cross word from the input field and generates the crossword puzzle.
   */
  ImportCrossW() {
    this.txtConsole = document.getElementById("txtConsole") as HTMLInputElement;
    let str = this.txtConsole.value;

    //Eliminar [" y ]
    str = str.substring(2, str.length - 2);
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


  /**
   * Loads a crossword puzzle by its ID and generates the crossword grid.
   * If no ID is provided, it retrieves the ID from the "cross_id" input element.
   * @param id - The ID of the crossword puzzle to load (optional).
   */
  LoadCrossWord(id?: number) {

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


  /**
   * Fills the crossWord array with random characters.
   */
  RandomCrossWFill() {

    // console.log("Iniciando");

    //this.GenerateCrossW();

    for (let i = 0; i < this.crossSize; i++) {

      for (let j = 0; j < this.crossSize; j++) {
        this.crossWord[i][j] = String.fromCharCode(27 * Math.random() + 64);

      }

    }

    // console.table(crossWord);

    this.DrawCrossWord();

  }



  /**
   * Filters and displays words and symbols based on the filter input value.
   */
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
        str += `<div class="hintWord" draggable="true">${c[0]}</div>`;
      }
      if ((c[2] as string).search(letter) != -1 && !this.UsedWordsSet.has(c[2])) {
        str += `<div class="hintSymbol" draggable="true">${c[2]}</div>`;
      }
    }

    
    document.getElementById("wordHints")!.innerHTML = str;
    // document.getElementById("symbolHints")!.innerHTML = strSymbols;

    //Agregar event listeners a las palabras de pista
    for (let c of Array.from(document.getElementsByClassName("hintWord"))  ) {
      c.addEventListener("dragstart",(e)=> this.onDragStart(e as DragEvent));
    }
    for (let c of Array.from(document.getElementsByClassName("hintSymbol"))  ) {
      c.addEventListener("dragstart",(e)=> this.onDragStart(e as DragEvent));
    }

  }

  /**
   * Fills the crossword puzzle with words.
   */
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
        if ((this.crossSize - i) < currWord.length) {
          continue;   //Continuar con otra palabra
        }
      } else {
        if ((this.crossSize - j) < currWord.length) {
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


  /**
   * Clears the crossword by resetting the values of the cells and redrawing the crossword.
   */
  ClearCrossWord() {
    this.GenerateCrossW();

    // this.cellsCollection = Array.from(document.getElementsByClassName("txtChar")) as HTMLInputElement[];

    for (const c of this.cellsCollection) {
      c.value = "";
      // c.setAttribute("style", "");
      // c.parentElement.parentElement.className = "cell";

    }

    this.filledCells = 0;
    this.DrawCrossWord();
    this.UpdateWordLogList();
    // this.wordLog!.innerHTML = "";
  }

  /**
   * Handles the key press event for the crossword component.
   * @param e - The key press event.
   */
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


  //TODO: Delete this method
  RefreshWordLog(word: string) {
    this.wordLog = document.getElementById("wordLog") as HTMLInputElement;
    this.wordLog.innerHTML += `<div>${word}</div>`;
  }
}
