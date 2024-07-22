import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { RandomizerService } from '../../../services/randomizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IElement } from '../../../interfaces';
import { ModalBComponent } from '../../../modal-b/modal-b.component';
import { get } from 'jquery';

@Component({
  selector: 'app-chem-guess-hang-man',
  standalone: true,
  templateUrl: './chem-guess-hang-man.component.html',
  styleUrls: ['./chem-guess-hang-man.component.scss'],
  imports:[ModalBComponent]
})
export class ChemGuessHangManComponent implements OnInit {

  send: string = 'assets/img/send.png';
  convert: string = 'assets/img/convert.png';
  
  
  word: string = '';
  displayedWord: string[] = [];
  guessedLetters: Set<string> = new Set(); // Para almacenar letras adivinadas
  letter: string = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  wordsArray: string[] = [];

  Element: IElement[] = [];

  constructor(private modalService: NgbModal,private random: RandomizerService) {}

  ngOnInit() {
    this.random.checkAndFetch();
    this.word = this.random.getRandomWord();
    this.addFavoriteEvent.emit(this.word);
    this.splitIntoWords(this.word);
    this.displayedWord = Array(this.word.length).fill('_');
    
  }
 


  getRandomWord(technologies: any[]): string {
    const randomIndex = Math.floor(Math.random() * technologies.length);
    return technologies[randomIndex].word;
  }


  checkLetter(letter: string) {
    if (!this.guessedLetters.has(letter)) {
      this.guessedLetters.add(letter); // Agregar la letra adivinada al conjunto de letras adivinadas
      let found = false;
      for (let i = 0; i < this.displayedWord.length; i++) {
        if (this.letter === letter) {
          this.displayedWord[i] = letter; // Actualizar el array displayedWord con la letra adivinada
          found = true;
        }
      }
      // Si la letra no está en la palabra, aquí podrías manejar otro tipo de lógica (por ejemplo, contar los errores)
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

  open() {
    const modalRef = this.modalService.open(ModalBComponent);
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === 'Cross click') {
      return 'by clicking on a cross button';
    } else if (reason === 'cancel') {
      return 'by clicking on cancel button';
    } else {
      return `with: ${reason}`;
    }
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


