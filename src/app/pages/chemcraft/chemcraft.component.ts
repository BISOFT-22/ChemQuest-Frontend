import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";
import { ModalErrorComponent } from '../../components/chemcraft/modal-error/modal-error.component';
import { CompoundService } from '../../services/compound.service';
import { ICompound } from '../../interfaces';

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [ElementListComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent, ModalErrorComponent],
  templateUrl: './chemcraft.component.html',
  styleUrl: './chemcraft.component.scss'
})
export class ChemcraftComponent implements OnInit{
  private compoundService = inject(CompoundService);
  public compoundsList: ICompound[] = [];
  @ViewChild('modalError') modalError!: ModalErrorComponent;

  constructor() {
    this.compoundService.getAll();
    effect(() => {      
      this.compoundsList = [...this.compoundService.compounds$()].reverse();
    });
  }

  ngOnInit(): void {
    this.compoundService.getAll();
  }


  showError(event: { title: string; text: string, buttons: boolean }): void {
      this.modalError.showModal(event.title, event.text, event.buttons);
    }

  }

