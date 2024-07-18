import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { RandomizerService } from '../../../services/randomizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBComponent } from '../../../modal-b/modal-b.component';

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
  constructor(private modalService: NgbModal,private random: RandomizerService) {}

  ngOnInit() {
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

}


