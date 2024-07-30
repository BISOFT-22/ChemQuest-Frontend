import { Component, OnInit } from '@angular/core';
import { ChemGuessHangManComponent } from '../chem-guess7/chem-guess-hang-man/chem-guess-hang-man.component';
import { RandomizerService } from '../../../services/randomizer.service';
import { IElement } from '../../../interfaces';

@Component({
  selector: 'app-chem-guess8',
  standalone: true,
  imports: [],
  templateUrl: './chem-guess8.component.html',
  styleUrls: ['./chem-guess8.component.scss']
})
export class ChemGuess8Component implements OnInit{
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
  ngOnInit(): void {
    this.fillTableFields();
  }

  public items = [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
  ];

  



  chargeElement(): void {
    const randomElement = this.random.getRandomElement();
    console.log(randomElement);
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
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
  // Función para rellenar los campos de la tabla
fillTableFields(): void {
  console.log(this.element1P);
  // Llamar a la función chargeElement para obtener el elemento aleatorio


  this.chargeElement();

  // Obtener los elementos de entrada de la tabla
  const table1 = document.getElementById('table1');
  const inputs1 = table1?.getElementsByTagName('input');

  if (inputs1 && inputs1.length >= 6) {
      // Rellenar los campos de la tabla con los datos del elemento
      inputs1[0].value = this.element1P?.name || '';
      inputs1[1].value = this.element1P?.symbol || '';
      inputs1[2].value = this.element1P?.atomicNumber?.toString() || '';
      inputs1[3].value = this.element1P?.proton?.toString() || '';
      inputs1[4].value = this.element1P?.neutron?.toString() || '';
      inputs1[5].value = this.element1P?.electron?.toString() || '';
  }

  this.chargeElement();

  // Obtener los elementos de entrada de la tabla
  const table = document.getElementById('table2');
  const inputs = table?.getElementsByTagName('input');

  if (inputs && inputs.length >= 6) {
      // Rellenar los campos de la tabla con los datos del elemento
      inputs[0].value = this.element1P?.name || '';
      inputs[1].value = this.element1P?.symbol || '';
      inputs[2].value = this.element1P?.atomicNumber?.toString() || '';
      inputs[3].value = this.element1P?.proton?.toString() || '';
      inputs[4].value = this.element1P?.neutron?.toString() || '';
      inputs[5].value = this.element1P?.electron?.toString() || '';
  }
}

   // chargeTables(): void {
  //   const randomElement = this.random.getRandomElement();
  //   this.element1P = {
      
  //     name: randomElement?.name,
  //     symbol: randomElement?.symbol,
  //     atomicNumber: randomElement?.atomicNumber,
  //     proton: randomElement?.proton,
  //     neutron: randomElement?.neutron,
  //     electron: randomElement?.electron
  //   };
  //   const randomElement2 = this.random.getRandomElement();

  //   this.element2P = {
      
  //     name: randomElement2?.name,
  //     symbol: randomElement2?.symbol,
  //     atomicNumber: randomElement2?.atomicNumber,
  //     proton: randomElement2?.proton,
  //     neutron: randomElement2?.neutron,
  //     electron: randomElement2?.electron
  //   };
  //   console.log("ELEMENTO1");
  //   console.log(this.element1P);
  //   console.log("ELEMENTO2");
  //   console.log(this.element2P);

   
  // }
  
}
 
