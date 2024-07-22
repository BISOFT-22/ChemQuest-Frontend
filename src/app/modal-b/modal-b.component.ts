import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-b',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './modal-b.component.html',
  styleUrl: './modal-b.component.scss'
})
export class ModalBComponent {
  constructor(public modal: NgbActiveModal) {}


}
