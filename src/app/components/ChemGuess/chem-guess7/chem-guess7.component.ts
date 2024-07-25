import { Component, viewChild, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';

import { ModalPruebasComponent } from '../../../modal-pruebas/modal-pruebas.component';

@Component ({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalComponent, NgbModule, ChemGuessHangManComponent, ModalPruebasComponent ],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component {
  @ViewChild('modalPrueba') modalError!: ModalPruebasComponent;
  live100: string = 'assets/img/live/live100.png';
  live75: string = 'assets/img/live/live75.png';
  live50: string = 'assets/img/live/live50.png';
  live25: string = 'assets/img/live/live25.png';
  live0: string = 'assets/img/live/live0.png';

  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';

  
  strike: number=0;
/////////////////////////



showHistory(): void {
  let visible:boolean= true;
  this.modalError.showModal(visible);
}







////////////////////////
  
  

opcion: string='';


 

  getWord(word:string){
    this.opcion = word;
  }


 
}
 


