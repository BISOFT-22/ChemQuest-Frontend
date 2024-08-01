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
}
 
