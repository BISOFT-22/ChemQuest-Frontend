import { Component, OnInit } from '@angular/core';

import { RandomizerService } from '../../../services/randomizer.service';
import { IElement } from '../../../interfaces';


/**
 * Component for ChemGuess8.
 */
@Component({
  selector: 'app-chem-guess8',
  standalone: true,
  imports: [],
  templateUrl: './chem-guess8.component.html',
  styleUrls: ['./chem-guess8.component.scss']
})
export class ChemGuess8Component implements OnInit {
  convert: string = 'assets/img/convert.png';
  public element1P: IElement = {
    name: '',
    symbol: '',
    proton: '',
    atomicNumber: 0,
    neutron: '',
    electron: ''
  };
  public element2P: IElement = {
    name: '',
    symbol: '',
    atomicNumber: 0,
    proton: '',
    neutron: '',
    electron: ''
  };
  elementCheck1: IElement = {};
  elementCheck2: IElement = {};

  constructor(private random: RandomizerService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.random.checkAndFetch();
    this.fillTableFields();
  }

  /**
   * Initializes things.
   */
  initializeThings(): void {
    // Ensure data is fetched
    this.random.checkAndFetch();

    this.random.items$.subscribe({
      next: () => {
        // Data has been fetched; proceed to get random word
        const randomWord = this.random.getRandomWord();
      },
      error: (error) => {
        console.error('Error fetching items', error);
      }
    });
  }

  public items = [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
  ];

  /**
   * Charges the element.
   */
  chargeElement(element: IElement): void {
    this.random.items$.subscribe({
      next: () => {
        // Data has been fetched; proceed to get random word
        const randomElement = this.random.getRandomElement();
        console.log(randomElement);
        if (element === this.element1P) {
          this.elementCheck1 = {
            name: randomElement?.name,
            symbol: randomElement?.symbol,
            atomicNumber: randomElement?.atomicNumber,
            proton: randomElement?.proton,
            neutron: randomElement?.neutron,
            electron: randomElement?.electron
          };
        }
        if (element === this.element2P) {
          this.elementCheck2 = {
            name: randomElement?.name,
            symbol: randomElement?.symbol,
            atomicNumber: randomElement?.atomicNumber,
            proton: randomElement?.proton,
            neutron: randomElement?.neutron,
            electron: randomElement?.electron
          };
        }
       
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        switch (randomNumber) {
          case 1:
            if (element === this.element1P) {
              this.element1P = {
                name: randomElement?.name,
                proton: randomElement?.proton,
                electron: randomElement?.electron
              };
            } else if (element === this.element2P) {
              this.element2P = {
                name: randomElement?.name,
                proton: randomElement?.proton,
                electron: randomElement?.electron
              };
            }
            break;
          case 2:
            if (element === this.element1P) {
              this.element1P = {
                symbol: randomElement?.symbol,
              };
            } else if (element === this.element2P) {
              this.element2P = {
                symbol: randomElement?.symbol,
              };
            }
            break;
          case 3:
            if (element === this.element1P) {
              this.element1P = {
                name: randomElement?.name,
                atomicNumber: randomElement?.atomicNumber,
              };
            } else if (this.element2P) {
              this.element2P = {
                name: randomElement?.name,
                atomicNumber: randomElement?.atomicNumber,
              };
            }
            break;
          default:
            break;
        }
      },
      error: (error) => {
        console.error('Error fetching items', error);
      }
    });
  }

  /**
   * Fills the fields of the table.
   */
  fillTableFields(): void {
    this.random.checkAndFetch();
    this.chargeElement(this.element1P);

    // Get the input elements of the table
    const table1 = document.getElementById('table1');
    const inputs1 = table1?.getElementsByTagName('input');
    console.log(this.elementCheck1)
    if (inputs1 && inputs1.length >= 6) {
      // Fill the table fields with the element data
      inputs1[0].value = this.element1P?.name || '';
      inputs1[1].value = this.element1P?.symbol || '';
      inputs1[2].value = this.element1P?.atomicNumber?.toString() || '';
      inputs1[3].value = this.element1P?.proton?.toString() || '';
      inputs1[4].value = this.element1P?.neutron?.toString() || '';
      inputs1[5].value = this.element1P?.electron?.toString() || '';
    }

    this.chargeElement(this.element2P);
      console.log(this.elementCheck2)
    // Get the input elements of the table
    const table = document.getElementById('table2');
    const inputs = table?.getElementsByTagName('input');

    if (inputs && inputs.length >= 6) {
      // Fill the table fields with the element data
      inputs[0].value = this.element2P?.name || '';
      inputs[1].value = this.element2P?.symbol || '';
      inputs[2].value = this.element2P?.atomicNumber?.toString() || '';
      inputs[3].value = this.element2P?.proton?.toString() || '';
      inputs[4].value = this.element2P?.neutron?.toString() || '';
      inputs[5].value = this.element2P?.electron?.toString() || '';
    }
  }

  save(): void {
    const table = document.getElementById('table1');
    const inputs = table?.getElementsByTagName('input');

    if (inputs && inputs.length >= 6) {
      // Fill the table fields with the element data
     let name1:string = inputs[0].value 
     let symbol1: string =inputs[1].value 
     let atomicNumber1: number = Number(inputs[2].value);
     let proton1:string = inputs[3].value
     let neutron1:string = inputs[4].value 
     let electron1:string =  inputs[5].value   
     
     this.insertInfo1(name1,symbol1,atomicNumber1,proton1,neutron1,electron1)
    }
    let response1:boolean = this.compareElement1();
    
    const table2 = document.getElementById('table2');
    const inputs2 = table2?.getElementsByTagName('input');
    if (inputs2 && inputs2.length >= 6) {
      // Fill the table fields with the element data
     let name2:string = inputs2[0].value 
     let symbol2: string =inputs2[1].value 
     let atomicNumber2:number =Number(inputs2[2].value); 
     let proton2:string = inputs2[3].value
     let neutron2:string = inputs2[4].value 
     let electron2:string =  inputs2[5].value   
     this.insertInfo2(name2,symbol2,atomicNumber2,proton2,neutron2,electron2)
    }
    let response2:boolean = this.compareElement2();

    if (response1 && response2) {
      console.log("TODO CORRECTO")
    }
  }
  insertInfo1(name1:string, symbol1:string, atomicNumber1:number, proton1:string, neutron1:string, electron1:string): void {
    this.element1P = {
      name: name1,
      symbol: symbol1,
      atomicNumber: atomicNumber1,
      proton: proton1,
      neutron: neutron1,
      electron: electron1
    };
    
  }
  insertInfo2(name2:string, symbol2:string, atomicNumber2:number, proton2:string, neutron2:string, electron2:string): void {
    this.element2P = {
      name: name2,
      symbol: symbol2,
      atomicNumber: atomicNumber2,
      proton: proton2,
      neutron: neutron2,
      electron: electron2
    };
  }
  compareElement1(): boolean {
    return this.element1P.name === this.elementCheck1.name &&
           this.element1P.symbol === this.elementCheck1.symbol &&
           this.element1P.atomicNumber === this.elementCheck1.atomicNumber &&
           this.element1P.proton === this.elementCheck1.proton &&
           this.element1P.neutron === this.elementCheck1.neutron &&
           this.element1P.electron === this.elementCheck1.electron;
  }
  compareElement2(): boolean {
    return this.element2P.name === this.elementCheck2.name &&
           this.element2P.symbol === this.elementCheck2.symbol &&
           this.element2P.atomicNumber === this.elementCheck2.atomicNumber &&
           this.element2P.proton === this.elementCheck2.proton &&
           this.element2P.neutron === this.elementCheck2.neutron &&
           this.element2P.electron === this.elementCheck2.electron;
  }

}
 
