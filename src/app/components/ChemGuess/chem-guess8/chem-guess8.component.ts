import { Component } from '@angular/core';
import { ChemGuessHangManComponent } from '../chem-guess7/chem-guess-hang-man/chem-guess-hang-man.component';
import { RandomizerService } from '../../../services/randomizer.service';
import { IElement } from '../../../interfaces';

@Component({
  selector: 'app-chem-guess8',
  standalone: true,
  imports: [ChemGuessHangManComponent],
  templateUrl: './chem-guess8.component.html',
  styleUrls: ['./chem-guess8.component.scss']
})
export class ChemGuess8Component {
  convert: string = 'assets/img/convert.png';
  element1P: IElement = {
    
    name: '',
    symbol: '',
    proton: '',
    atomicNumber: 0,
    neutron: '',
    electron: ''
  };
  element2P: IElement = {
    
    name: '',
    symbol: '',
    atomicNumber: 0,
    proton: '',
    neutron: '',
    electron: ''
  };

  constructor(private random: RandomizerService) { }

  public items = [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
  ];

  live: number = 8;

  chargeTables(): void {
    const randomElement = this.random.getRandomElement();
    this.element1P = {
      
      name: randomElement?.name,
      symbol: randomElement?.symbol,
      atomicNumber: randomElement?.atomicNumber,
      proton: randomElement?.proton,
      neutron: randomElement?.neutron,
      electron: randomElement?.electron
    };
    const randomElement2 = this.random.getRandomElement();

    this.element2P = {
      
      name: randomElement2?.name,
      symbol: randomElement2?.symbol,
      atomicNumber: randomElement2?.atomicNumber,
      proton: randomElement2?.proton,
      neutron: randomElement2?.neutron,
      electron: randomElement2?.electron
    };
    console.log("ELEMENTO1");
    console.log(this.element1P);
    console.log("ELEMENTO2");
    console.log(this.element2P);

   
  }

  chargeElement(): void {
    const randomElement = this.random.getRandomElement();
    switch (randomElement?.atomicNumber) {
      case 1:
        this.element1P = {
          name: randomElement?.name,
        
          proton: randomElement?.proton,
       
          electron: randomElement?.electron
        };
        break;
      case 2:
        this.element1P = {
          symbol: randomElement?.symbol,
        };
        break;
      case 3:
        this.element1P = {
          name: randomElement?.name,
          atomicNumber: randomElement?.atomicNumber,
        };
        break;
      default:
        break;
    }
    
  }

 
  
}
 
