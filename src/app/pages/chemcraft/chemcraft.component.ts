import { AfterViewInit, Component, effect, OnInit, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";
import { ModalErrorComponent } from '../../components/chemcraft/modal-error/modal-error.component';
import { CompoundService } from '../../services/compound.service';
import { ICompound } from '../../interfaces';
import { BackgroundService } from '../../services/background.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [CommonModule, ElementListComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent, ModalErrorComponent],
  templateUrl: './chemcraft.component.html',
  styleUrl: './chemcraft.component.scss'
})
export class ChemcraftComponent implements OnInit {
  public compoundsList: ICompound[] = [];
  public currentCompoundFormula: string = '';
  public elementCount: number = 0;
  public slotsArray: any[] = [];
  @ViewChild('modalError') modalError!: ModalErrorComponent;
  public change: boolean = false;
  @ViewChildren(SlotComponent) slots!: QueryList<SlotComponent>;
//tambien los viewChild se pueden trabjar asi ahora: children = viewChild!(ElementListComponent); trabajan como signals, en la documentacion de angular esta, pero mejor los dejo con los decoradores viejos

  constructor(private backgroundService: BackgroundService, private compoundService: CompoundService) {
    this.compoundService.getAll();
    effect(() => {      
      this.compoundsList = this.compoundService.compounds$();
    });
  }

  ngOnInit(): void {
    this.backgroundService.changeBackground('assets/img/chemcraft/bgChemcraft-light.png');
  }

  showAlert(event: { title: string; text: string, buttons: boolean }): void {
    // console.log('Alert: ', event);
    this.modalError.showModal(event.title, event.text, event.buttons);
  }

  onCompoundGenerated(formula: string): void {
    this.currentCompoundFormula = formula;
    // console.log('Formula: ', formula);
    this.setSlots();
  }

  setSlots(): void {
    const formula = this.currentCompoundFormula || '';
    const elementSymbolPar = /[A-Z][a-z]?/g; // esto funciona de manera que primero seleciona una letra mayuscula y luego una minuscula para elementos como el Al o el Fe, Mg, etc..
    const elements = formula.match(elementSymbolPar) || []; //aca revisa que la formula tenga elementos y si no los tiene, devuelve un array vacio
    const uniqueElements = new Set(elements);
    this.elementCount = uniqueElements.size;
    this.slotsArray = Array(this.elementCount);
  }
  
  cleanSlots(): void {
    this.slots.forEach(slot => slot.clearSlotContent());
  }

  sendAction(event: { option: boolean }): void {
    this.change = event.option;
    if (this.change) {
      this.cleanSlots();
      setTimeout(() => {
        this.change = false; //esto porque desde el request.compound no detecta los cambios cuando el cambio es true y se pasa a false
      }, 1000);
    }
  }
}
