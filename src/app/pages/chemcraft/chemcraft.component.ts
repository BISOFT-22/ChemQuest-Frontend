import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [ElementListComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent],
  templateUrl: './chemcraft.component.html',
  styleUrls: ['./chemcraft.component.scss']
})
export class ChemcraftComponent {

 
}
