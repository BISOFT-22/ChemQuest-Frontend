import { AfterViewInit, Component, EventEmitter, Input,OnInit, Output, ViewChild } from '@angular/core';
import { RandomizerService } from '../../../../services/randomizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {IHistory, IUser } from '../../../../interfaces';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../modal/modal.component';
import { ChemGuessForm7Component } from '../chem-guess-form7/chem-guess-form7.component';
import { ChemGuessHistoryComponent } from '../chem-guess-history/chem-guess-history.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalPruebasComponent } from "../../../../modal-pruebas/modal-pruebas.component";
import { LifeChangeService } from '../../../../services/lifeChange.service';
import { ChemGuessSendComponent } from '../chem-guess-send7/chem-guess-form7.component';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

/**
 * Component for the Hangman game in the ChemGuess application.
 * Allows users to guess letters and compare them with a randomly generated word.
 * Keeps track of user history and updates the display accordingly.
 */
@Component({
  selector: 'app-chem-guess-hang-man',
  standalone: true,
  templateUrl: './chem-guess-hang-man.component.html',
  styleUrls: ['./chem-guess-hang-man.component.scss'],
  imports: [ModalComponent, ChemGuessForm7Component, ChemGuessHistoryComponent, CommonModule, FormsModule, ModalPruebasComponent, ChemGuessSendComponent]
})
export class ChemGuessHangManComponent implements OnInit {
  /**
   * Path to the send image asset.
   */
  send: string = 'assets/img/send.png';

  /**
   * Path to the convert image asset.
   */
  convert: string = 'assets/img/convert.png';

  /**
   * Input property for the user's history.
   * Contains the user's guessed words, type colors, and remaining wrong guesses.
   */
  @Input() streak: number | undefined;
  @Input() history: IHistory = {
    userWords: [],  
    typeColor: [],
    wrong: 5,
  };

  /**
   * User object.
   */
  user:IUser = {};

  /**
   * Input property for all user histories.
   * Contains an array of all user histories.
   */
  @Input() allHistory: IHistory[] = [];
  @Input() change: boolean = false;

  /**
   * The word to be guessed.
   */
  word: string = '';

  /**
   * The letter input by the user.
   */
  letter: string = '';

  /**
   * Event emitter for adding a favorite word.
   */
  @Output() addFavoriteEvent = new EventEmitter<string>();

  /**
   * The displayed word with blanks and guessed letters.
   */
  displayedWord: string[] = [];

  /**
   * Set of guessed letters.
   */
  guessedLetters: Set<string> = new Set(); 

  /**
   * Array of individual letters in the word.
   */
  wordsArray: string[] = [];

  /**
   * Event emitter for history change.
   */
  @Output() historyChange: EventEmitter<IHistory[]> = new EventEmitter<IHistory[]>();

  /**
   * Constructor for the ChemGuessHangManComponent.
   * @param modalService - The NgbModal service.
   * @param random - The RandomizerService.
   * @param router - The Router service.
   * @param liveChangeService - The LiveChangeService.
   * @param authService - The AuthService.
   * @param userService - The UserService.
   */
  constructor(private modalService: NgbModal,private random: RandomizerService,  private router: Router, private lifeChangeService: LifeChangeService, private authService: AuthService, private userService: UserService) {
  }

  /**
   * Calls the historyChange event emitter.
   */
  callEvent() {
    this.historyChange.emit(this.allHistory);
  }

  /**
   * Shows the detail modal.
   * @param modal - The modal to be shown.
   */
  showDetailModal(modal: any) {
    modal.show();
  }
  @ViewChild('detailModalSend') detailModalChange!: ModalComponent;
  /**
   * Handles the form update event.
   * @param response - The response from the form update.
   */
  handleFormUpdate(response: boolean) {
    if (response) {
      this.change = true;
      this.onConvert();

    } 
  }

  /**
   * Handles the form send event.
   * @param response - The response from the form send.
   */
  handleFormSend(response: boolean) {
    if (response) {
      this.CompareWord();
      this.detailModalChange.hide(); // Cierra el modal
    }
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.initializeThings();
  }
  

  /**
   * Initializes the necessary data and fetches random word.
   */
  initializeThings(): void {
    // Ensure data is fetched
    this.random.checkAndFetch();
    this.user = this.authService.getUser() || {};

    this.random.items$.subscribe({
      next: () => {
        // Data has been fetched; proceed to get random word
        const randomWord = this.random.getRandomWord();
        if (randomWord) {
          this.word = this.removeAccents(randomWord.toUpperCase());
          console.log(this.word);
          this.splitIntoWords(this.word);
          this.displayedWord = Array(this.word.length).fill('_');
        } else {
          // Handle the case where no random word is available
          console.warn('No random word available');
        }
      },
      error: (error) => {
        console.error('Error fetching items', error);
      }
    });
    
  }

  /**
   * Removes accents from a string.
   * @param str - The string to remove accents from.
   * @returns The string without accents.
   */
  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ñ/g, "Ñ");
  }

  /**
   * Checks if the guessed letter is correct and updates the displayed word.
   * @param letters - The guessed letter.
   */
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

  /**
   * Replaces a blank with the guessed letter at the specified index.
   * @param index - The index of the blank to replace.
   * @param letter - The guessed letter.
   */
  replaceBlank(index: number, letter: string) {
    if (this.displayedWord[index] === '_') {
      this.displayedWord[index] = letter.toUpperCase(); // Reemplazar el guión bajo con la letra ingresada
    }
  }

  /**
   * Splits the word into individual letters.
   * @param input - The word to split.
   */
  splitIntoWords(input: string): void {
    this.wordsArray = input.split('');
  }

  /**
   * Clears the slots and initializes the component again.
   */
  onConvert(): void {
    
    window.location.reload();
    
  }

  /**
   * Clears the slots by removing the letters and resetting the guessed letters and displayed word.
   */
  clearSlots(): void {
    const slots = document.querySelectorAll<HTMLElement>('.slot');
    slots.forEach(slot => {
      slot.textContent = '';
    });
    this.guessedLetters.clear();
    this.displayedWord = Array(this.word.length).fill('_');
  }

  /**
   * Compares the user's word with the correct word and updates the history.
   */
  CompareWord(): void {
    this.user = this.authService.getUser() || {};
    let historytemp: IHistory = {
      userWords: [],
      typeColor: [],
      wrong: this.history.wrong,
    };
    const slots = document.querySelectorAll<HTMLElement>('.slot');
    let wordArrayCorrectTemp: (string | null)[] = [...this.wordsArray];
    let procesado: boolean[] = new Array(slots.length).fill(false);

    // Primera iteración para coincidencias exactas
    slots.forEach((slot, i) => {
      if (slot.textContent === this.wordsArray[i]) {
        historytemp.userWords!.push(slot.textContent!);
        historytemp.typeColor!.push("#4575b4"); // azul
        wordArrayCorrectTemp[i] = null;
        procesado[i] = true;
      } else {
        historytemp.userWords!.push('');
        historytemp.typeColor!.push('');
      }
    });

    // Segunda iteración para coincidencias parciales
    slots.forEach((slot, i) => {
      if (!procesado[i]) {
        const index = wordArrayCorrectTemp.indexOf(slot.textContent!);
        if (index !== -1) {
          historytemp.userWords![i] = slot.textContent!;
          historytemp.typeColor![i] = "#fee090"; // Amarillo
          wordArrayCorrectTemp[index] = null;
        } else {
          historytemp.userWords![i] = slot.textContent!;
          historytemp.typeColor![i] = "#d73027"; // Rojo
        }
      }
    });

    if (historytemp.typeColor) {
      for (const color of historytemp.typeColor) {
        if (color === "#d73027") {
          historytemp.wrong = historytemp.wrong ? historytemp.wrong - 1 : 0;
          break;
        }
      }
    }
    ///Se encarga de ver si el juego se completo si o no
      if (historytemp.typeColor) {
        let goodAnswer = 0;
        console.log(historytemp.typeColor.length);
        for (const color of historytemp.typeColor) {
          if (color === "#4575b4") {
            goodAnswer++;
          }
        }
        console.log(goodAnswer);
        if (goodAnswer === historytemp.typeColor.length) {
          this.increaseStreak(historytemp);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }

    if (historytemp.wrong == 0) {
      this.router.navigate(['app/games']);
    }
    //se encarga de aumentar la racha del usuario
   
  
    this.updateHistory(historytemp);

    this.lifeChangeService.setLive(historytemp.wrong || 5);
    console.log("Vidas: " + this.lifeChangeService.life.value);
    this.clearSlots();
    this.allHistory.push(historytemp)
    this.callEvent();
  }
  increaseStreak(historyTemp:IHistory): void {
    if (historyTemp.typeColor && this.user) {
      for (const color of historyTemp.typeColor) {
        if (color === "#4575b4") {
          this.user.streak = (this.user.streak || 0) + 1;
          this.streak = this.user.streak;
          console.log("Racha: " + this.streak);
          this.userService.updateUserSignal(this.user);
          break;
        }
      }
    }
  }
  /**
   * Updates the history with the provided historyTemp.
   * @param historyTemp - The updated history.
   */
  updateHistory(historyTemp: IHistory): void {
    this.history = {
      wrong: historyTemp.wrong,
    };
  }

  /**
   * Initializes the drag and drop functionality after the view has been initialized.
   */

  OnDragStart(e: DragEvent) {
    e.dataTransfer?.setData("text", (e.target as HTMLElement).getAttribute('data-letter') as string);
}

OnDragOver(e: Event) {
    e.preventDefault();
}

OnDropOnCross(e: DragEvent) {
    e.preventDefault();
    let data = e.dataTransfer?.getData("text");
    if (data) {
        // Buscar el primer elemento con la clase 'slot'
        let slotElement = e.target as HTMLElement;
        if (slotElement && slotElement.classList.contains('slot')) {
            // Asignar los datos obtenidos al contenido del elemento
            slotElement.textContent = data;
        }
    }
}









  /**
   * Makes the keys draggable and the slots droppable.
   */
  // makeDraggable(): void {
  //   const keys = document.querySelectorAll<HTMLElement>('.key');
  //   const slots = document.querySelectorAll<HTMLElement>('.slot');

  //   keys.forEach((element) => {
  //     element.addEventListener('mousedown', (e: MouseEvent) => {
  //       e.preventDefault();

  //       // Crea una copia del elemento
  //       const copy = element.cloneNode(true) as HTMLElement;
  //       copy.style.position = 'absolute';
  //       copy.style.left = `${e.clientX}px`;
  //       copy.style.top = `${e.clientY}px`;
  //       document.body.appendChild(copy);

  //       // Leer la letra del atributo data-letter
  //       const letter = (element.getAttribute('data-letter') || '').toUpperCase();
  //       copy.setAttribute('data-letter', letter);

  //       const offsetX = e.clientX - element.getBoundingClientRect().left;
  //       const offsetY = e.clientY - element.getBoundingClientRect().top;

  //       const onMouseMove = (e: MouseEvent) => {
  //         copy.style.left = `${e.clientX - offsetX}px`;
  //         copy.style.top = `${e.clientY - offsetY}px`;

  //         // Detecta si la copia está sobre un slot
  //         const copyRect = copy.getBoundingClientRect();
  //         let isOverSlot = false;

  //         slots.forEach((slot) => {
  //           const slotRect = slot.getBoundingClientRect();
  //           if (
  //             copyRect.left < slotRect.right &&
  //             copyRect.right > slotRect.left &&
  //             copyRect.top < slotRect.bottom &&
  //             copyRect.bottom > slotRect.top
  //           ) {
  //             isOverSlot = true;
  //             slot.classList.add('over'); // Opcional: agregar clase para visualización
  //           } else {
  //             slot.classList.remove('over');
  //           }
  //         });

  //         // Cambia el cursor si está sobre un slot
  //         document.body.style.cursor = isOverSlot ? 'pointer' : 'default';
  //       };

  //       const onMouseUp = () => {
  //         document.removeEventListener('mousemove', onMouseMove);
  //         document.removeEventListener('mouseup', onMouseUp);

  //         document.body.style.cursor = 'default'; // Restaura el cursor

  //         // Mueve la copia al slot si está sobre uno
  //         let isPlaced = false;

  //         slots.forEach((slot) => {
  //           const slotRect = slot.getBoundingClientRect();
  //           const copyRect = copy.getBoundingClientRect();

  //           if (
  //             copyRect.left < slotRect.right &&
  //             copyRect.right > slotRect.left &&
  //             copyRect.top < slotRect.bottom &&
  //             copyRect.bottom > slotRect.top
  //           ) {
  //             // Coloca la letra en el slot
  //             const letter = copy.getAttribute('data-letter');
  //             if (letter) {
  //               slot.textContent = letter; // Inserta la letra en el slot
  //             }
  //             slot.classList.remove('over');
  //             copy.remove(); // Elimina la copia después de moverla
  //             isPlaced = true;
  //           }
  //         });

  //         // Si no se coloca en ningún slot, elimina la copia
  //         if (!isPlaced) {
  //           copy.remove();
  //         }
  //       };

  //       document.addEventListener('mousemove', onMouseMove);
  //       document.addEventListener('mouseup', onMouseUp);
  //     });
  //   });
  // }
}


