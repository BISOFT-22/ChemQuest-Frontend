import { Component, ViewChild } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";
import { ModalErrorComponent } from '../../components/chemcraft/modal-error/modal-error.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [ElementListComponent, ModalComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent, ModalErrorComponent],
  templateUrl: './chemcraft.component.html',
  styleUrls: ['./chemcraft.component.scss']
})
export class ChemcraftComponent {
  @ViewChild('modalError', { static: true }) modalError!: ModalComponent;
  @ViewChild(ModalErrorComponent) modalErrorComponent!: ModalErrorComponent;

  showError(event: { title: string; text: string }): void {
    if (this.modalErrorComponent) {
      this.modalErrorComponent.showModal(event.title, event.text);
      this.modalError.show();
    }
  }
}
