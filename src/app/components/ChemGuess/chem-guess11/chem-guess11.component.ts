import { Component } from '@angular/core';
import { ModalBComponent } from '../../../modal-b/modal-b.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chem-guess11',
  standalone: true,
  imports: [ModalBComponent, NgbModule],
  templateUrl: './chem-guess11.component.html',
  styleUrl: './chem-guess11.component.scss'
})
export class ChemGuess11Component {
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
