import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { RandomizerService } from '../../../services/randomizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IElement, IHistory } from '../../../interfaces';


import { Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { ChemGuessForm7Component } from '../chem-guess-form7/chem-guess-form7.component';
import { ChemGuessHistoryComponent } from '../chem-guess-history/chem-guess-history.component';

@Component({
  selector: 'app-chem-guess-hang-man',
  standalone: true,
  templateUrl: './chem-guess-hang-man.component.html',
  styleUrls: ['./chem-guess-hang-man.component.scss'],
  imports:[ModalComponent, ChemGuessForm7Component, ChemGuessHistoryComponent]
})
export class ChemGuessHangManComponent implements OnInit {

  send: string = 'assets/img/send.png';
  convert: string = 'assets/img/convert.png';
 
  history: IHistory = {
    userWords: [],  
    typeColor: []
  };
  allHistory :IHistory[] =[];
  word: string = '';
  letter: string = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();
  displayedWord: string[] = [];
  guessedLetters: Set<string> = new Set(); 
  wordsArray: string[] = [];// tiene la letra por separado
  
  @Output() historyChange = new EventEmitter<IHistory[]>();
  ////////////////////////////
  

  constructor(private modalService: NgbModal,private random: RandomizerService,  private router: Router) {
    
  }

  ngOnInit():void {
    this.initializeThings();
    
  }
  initializeThings(): void {
    let randomWord;
    this.random.checkAndFetch();
    randomWord = this.random.getRandomWord();
    this.word=  this.removeAccents(randomWord.toUpperCase()); 
     console.log(this.word)
    this.splitIntoWords(this.word);
    this.displayedWord = Array(this.word.length).fill('_');
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ñ/g, "Ñ");
  }


  checkLetter(letters: string) {
    if (!this.guessedLetters.has(letters)) {
      this.guessedLetters.add(letters);
      let found = false;
      for (let i = 0; i < this.displayedWord.length; i++) {
        if (this.letter === letters) {
          this.displayedWord[i] = letters; 
          found = true;
        }
      }
    
    }
  }
  replaceBlank(index: number, letter: string) {
    if (this.displayedWord[index] === '_') {
      this.displayedWord[index] = letter.toUpperCase(); // Reemplazar el guión bajo con la letra ingresada
    }
  }
  splitIntoWords(input: string): void {
    this.wordsArray = input.split('');
  }
  //////////////////////////////////modal para cambiar pregunta
  showDetailModal(modal: any) {
    modal.show();
  }


  handleFormAction(response: boolean) {
    if (response) {
      this.onConvert();
    }
  }
  
  /////////funciones para recargar la lista y para recargar la pagina para cambiar el elemento
  onConvert(): void {
    this.clearSlots();
    this.router.navigate([this.router.url]).then(() => {
      this.initializeThings();
    });
  }

  clearSlots(): void {
    const slots = document.querySelectorAll<HTMLElement>('.slot');
    slots.forEach(slot => {
      slot.textContent = '';
    });
    this.guessedLetters.clear();
    this.displayedWord = Array(this.word.length).fill('_');
  }
/////////////////////////////Comprobar palabra
CompareWord(): void {
  this.history
  const slots = document.querySelectorAll<HTMLElement>('.slot');
  let wordArrayCorrectTemp: (string | null)[] = [...this.wordsArray];
  let procesado: boolean[] = new Array(slots.length).fill(false);

  // Primera iteración para coincidencias exactas
  slots.forEach((slot, i) => {
    if (slot.textContent === this.wordsArray[i]) {
      this.history.userWords!.push(slot.textContent!);
      this.history.typeColor!.push("#87F14A"); // Verde
      wordArrayCorrectTemp[i] = null;
      procesado[i] = true;
    } else {
      this.history.userWords!.push('');
      this.history.typeColor!.push('');
    }
  });

  // Segunda iteración para coincidencias parciales
  slots.forEach((slot, i) => {
    if (!procesado[i]) {
      const index = wordArrayCorrectTemp.indexOf(slot.textContent!);
      if (index !== -1) {
        this.history.userWords![i] = slot.textContent!;
        this.history.typeColor![i] = "#FFFF00"; // Amarillo
        wordArrayCorrectTemp[index] = null;
      } else {
        this.history.userWords![i] = slot.textContent!;
        this.history.typeColor![i] = "#FF0000"; // Rojo
      }
    }
  });
console.log(this.history)
 this.allHistory.push(this.history)
 this.historyChange.emit(this.allHistory)
}



  

/////////////////////////////////////DRAG AND DROP
ngAfterViewInit(): void {
  this.makeDraggable();
}

makeDraggable(): void {
  const keys = document.querySelectorAll<HTMLElement>('.key');
  const slots = document.querySelectorAll<HTMLElement>('.slot');

  keys.forEach((element) => {
    element.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();

      // Crea una copia del elemento
      const copy = element.cloneNode(true) as HTMLElement;
      copy.style.position = 'absolute';
      copy.style.left = `${e.clientX}px`;
      copy.style.top = `${e.clientY}px`;
      document.body.appendChild(copy);

      // Leer la letra del atributo data-letter
      const letter = (element.getAttribute('data-letter') || '').toUpperCase();
      copy.setAttribute('data-letter', letter);

      const offsetX = e.clientX - element.getBoundingClientRect().left;
      const offsetY = e.clientY - element.getBoundingClientRect().top;

      const onMouseMove = (e: MouseEvent) => {
        copy.style.left = `${e.clientX - offsetX}px`;
        copy.style.top = `${e.clientY - offsetY}px`;

        // Detecta si la copia está sobre un slot
        const copyRect = copy.getBoundingClientRect();
        let isOverSlot = false;

        slots.forEach((slot) => {
          const slotRect = slot.getBoundingClientRect();
          if (
            copyRect.left < slotRect.right &&
            copyRect.right > slotRect.left &&
            copyRect.top < slotRect.bottom &&
            copyRect.bottom > slotRect.top
          ) {
            isOverSlot = true;
            slot.classList.add('over'); // Opcional: agregar clase para visualización
          } else {
            slot.classList.remove('over');
          }
        });

        // Cambia el cursor si está sobre un slot
        if (isOverSlot) {
          document.body.style.cursor = 'pointer';
        } else {
          document.body.style.cursor = 'default';
        }
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        document.body.style.cursor = 'default'; // Restaura el cursor

        // Mueve la copia al slot si está sobre uno
        let isPlaced = false;

        slots.forEach((slot) => {
          const slotRect = slot.getBoundingClientRect();
          const copyRect = copy.getBoundingClientRect();

          if (
            copyRect.left < slotRect.right &&
            copyRect.right > slotRect.left &&
            copyRect.top < slotRect.bottom &&
            copyRect.bottom > slotRect.top
          ) {
            // Coloca la letra en el slot
            const letter = copy.getAttribute('data-letter');
            if (letter) {
              slot.textContent = letter; // Inserta la letra en el slot
            }
            slot.classList.remove('over');
            copy.remove(); // Elimina la copia después de moverla
            isPlaced = true;
          }
        });

        // Si no se coloca en ningún slot, elimina la copia
        if (!isPlaced) {
          copy.remove();
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
}



}


