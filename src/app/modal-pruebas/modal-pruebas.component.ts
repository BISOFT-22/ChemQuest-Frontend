import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChemGuessHistoryComponent } from '../components/ChemGuess/chem-guess7/chem-guess-history/chem-guess-history.component';

@Component({
  selector: 'app-modal-pruebas',
  standalone: true,
  imports: [ChemGuessHistoryComponent, CommonModule],
  templateUrl: './modal-pruebas.component.html',
  styleUrl: './modal-pruebas.component.scss'
})
export class ModalPruebasComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() size?: string;
  isVisible: boolean = false;  
  buttonsVisible: boolean = false;
  @ViewChild('modal') modal: any;
  private modalRef?: NgbModalRef;

constructor(private modalService: NgbModal) {
  console.log("modal-pruebas");
}

  showModal(visible:boolean): void {
    if (visible) {
      this.isVisible = true;
    }
  }
  public show() {
    this.modalRef = this.modalService.open(this.modal, {
      ariaLabelledBy: 'modal-component',
      centered: true,
      size: this.size ?? 'md',
    });
  }
  public hide() {
    this.modalRef?.dismiss();
  }

  closeModal(): void {
    this.isVisible = false;
  }
}
