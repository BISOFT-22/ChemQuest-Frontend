import { Component, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { RandomizerService } from '../../../services/randomizer.service';
import { ModalBComponent } from '../../../modal-b/modal-b.component';


@Component({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalBComponent, NgbModule, ChemGuessHangManComponent],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component {
  constructor(private modalService: NgbModal,private random: RandomizerService) {}
  live100: string = 'assets/img/live/live100.png';
  live75: string = 'assets/img/live/live75.png';
  live50: string = 'assets/img/live/live50.png';
  live25: string = 'assets/img/live/live25.png';
  live0: string = 'assets/img/live/live0.png';

  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';

  

/////////////////////////











////////////////////////
  
  

opcion: string='';
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

  getWord(word:string){
    this.opcion = word;
  }


 
}
 


