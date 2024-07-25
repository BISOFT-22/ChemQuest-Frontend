import { Component, ViewChild } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";
import { ModalErrorComponent } from '../../components/chemcraft/modal-error/modal-error.component';

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [ElementListComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent, ModalErrorComponent],
  templateUrl: './chemcraft.component.html',
  styleUrl: './chemcraft.component.scss'
})
export class ChemcraftComponent {

  @ViewChild('modalError') modalError!: ModalErrorComponent;

  showError(event: { title: string; text: string, buttons: boolean }): void {
      this.modalError.showModal(event.title, event.text, event.buttons);
    }

  }

