import { Component, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalBComponent } from '../../../modal-b/modal-b.component';
@Component({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalBComponent, NgbModule],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component {
  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';



  constructor(private modalService: NgbModal) {}

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
 


