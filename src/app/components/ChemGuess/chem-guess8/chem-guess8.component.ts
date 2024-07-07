import { Component } from '@angular/core';
import { ChemGuess7Component } from '../chem-guess7/chem-guess7.component';
import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';

@Component({
  selector: 'app-chem-guess8',
  standalone: true,
  imports: [ChemGuessHangManComponent],
  templateUrl: './chem-guess8.component.html',
  styleUrl: './chem-guess8.component.scss'
})
export class ChemGuess8Component {

  public items =  [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    
  ];

live:number = 8;
}
