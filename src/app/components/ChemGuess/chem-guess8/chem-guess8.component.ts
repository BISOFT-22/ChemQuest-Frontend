import { Component } from '@angular/core';
import { ChemGuess7Component } from '../chem-guess7/chem-guess7.component';
import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { RandomizerService } from '../../../services/randomizer.service';
import { IElement } from '../../../interfaces';

@Component({
  selector: 'app-chem-guess8',
  standalone: true,
  imports: [ChemGuessHangManComponent],
  templateUrl: './chem-guess8.component.html',
  styleUrl: './chem-guess8.component.scss'
})
export class ChemGuess8Component {
  convert: string = 'assets/img/convert.png';
   element1: IElement = {
   
    name: '',
    description: '',
    atomicNumber: 0,
    symbol: '',
    group: 0,
    period: 0,
    block: '',
    series: '',
    discover: '',
    discoveredBy: '',
    origin: '',
    image: '',
    source: '',
    proton: '',
    neutron: '',
    electron: ''
  };

  constructor(private random:RandomizerService){}
  public items =  [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
 
    
  ];

live:number = 8;
}
