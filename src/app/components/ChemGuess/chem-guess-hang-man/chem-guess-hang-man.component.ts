import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { RandomizerService } from '../../../services/randomizer.service';

@Component({
  selector: 'app-chem-guess-hang-man',
  standalone: true,
  templateUrl: './chem-guess-hang-man.component.html',
  styleUrls: ['./chem-guess-hang-man.component.scss']
})
export class ChemGuessHangManComponent implements OnInit {

  
 
  
  word: string = '';
  displayedWord: string[] = [];
  guessedLetters: Set<string> = new Set(); // Para almacenar letras adivinadas
  letter: string = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  wordsArray: string[] = [];
  constructor(private random: RandomizerService) {}

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

}


