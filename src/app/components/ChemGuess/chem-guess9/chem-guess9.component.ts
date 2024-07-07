import { Component } from '@angular/core';
import { ModalBComponent } from '../../../modal-b/modal-b.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chem-guess9',
  standalone: true,
  imports: [ModalBComponent, NgbModule ],
  templateUrl: './chem-guess9.component.html',
  styleUrl: './chem-guess9.component.scss'
})
export class ChemGuess9Component {
  public items =  [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    
  ];

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

