import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICompound } from 'app/interfaces';
import { ChemquestModalComponent } from "../../chemquest-modal/chemquest-modal.component";

@Component({
  selector: 'app-modal-info-compound',
  standalone: true,
  imports: [ChemquestModalComponent],
  templateUrl: './modal-info-compound.component.html',
  styleUrl: './modal-info-compound.component.scss'
})
export class ModalInfoCompoundComponent implements OnInit {
  @Input() compound: ICompound = {};
  @ViewChild('modal') modal!: ChemquestModalComponent;
  @Output() action = new EventEmitter<{option: boolean}>();

  ngOnInit(): void {
    console.log(this.compound);
   }

   sendAction(event: { option: boolean }): void {
    this.action.emit({option: true});
   }

}