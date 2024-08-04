/**
*@Author Alejandro José Salazar Lobo
*/
import { AfterViewInit, Component, effect, OnInit, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";
import { SlotComponent } from "../../components/chemcraft/slot/slot.component";
import { ModalInfoCompoundComponent } from "../../components/chemcraft/modal-info-compound/modal-info-compound.component";
import { ModalTutorialComponent } from "../../components/chemcraft/modal-tutorial/modal-tutorial.component";
import { CompoundRequestComponent } from "../../components/chemcraft/compound-request/compound-request.component";
import { CompoundService } from '../../services/compound.service';
import { ICompound } from '../../interfaces';
import { BackgroundService } from '../../services/background.service';
import { CommonModule } from '@angular/common';
import { ChemquestModalComponent } from "../../components/chemquest-modal/chemquest-modal.component";

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [CommonModule, ElementListComponent, SlotComponent, ModalInfoCompoundComponent, ModalTutorialComponent, CompoundRequestComponent, ChemquestModalComponent],
  templateUrl: './chemcraft.component.html',
  styleUrl: './chemcraft.component.scss'
})
export class ChemcraftComponent implements OnInit {
  public compoundsList: ICompound[] = [];
  public currentCompoundFormula: string = '';
  public craftFormula: string = '';
  public elementCount: number = 0;
  public slotsArray: any[] = [];
  @ViewChild('modal') modal!: ChemquestModalComponent;
  public change: boolean = false;
  @ViewChildren(SlotComponent) slots!: QueryList<SlotComponent>;
//tambien los viewChild se pueden trabjar asi ahora: children = viewChild!(ElementListComponent); trabajan como signals, en la documentacion de angular esta, pero mejor los dejo con los decoradores viejos

  constructor(private backgroundService: BackgroundService, private compoundService: CompoundService) {
    this.compoundService.getAll();
    effect(() => {      
      this.compoundsList = this.compoundService.compounds$();
    });
  }


  /**
   * Cambia el background una vez inicializado el componente.
   */
  ngOnInit(): void {
    this.backgroundService.changeBackground('assets/img/chemcraft/bgChemcraft-light.png');
  }

  /**
   * Muestra un modal de alerta para cambiar el compuesto.
   */
  showAlert(event: { title: string; text: string, isAlert: boolean, buttonAccept: boolean, buttonCancel: boolean  }): void {
    // console.log('Alert: ', event);
    this.modal.showModal(event.title, event.text, event.isAlert, event.buttonAccept, event.buttonCancel);
  }


  
  /**
   * Actualiza la fórmula del compuesto actual y establece los espacios.
   * 
   * @param formula La fórmula del compuesto generado.
   */
  onCompoundGenerated(formula: string): void {
    console.log('Formula: ', formula);
    this.currentCompoundFormula = this.expandFormula(formula);
     console.log('Formula: ', this.currentCompoundFormula);
    this.setSlots();
  }



  /**
   * Expande una fórmula química para mostrar los elementos y sus cantidades.
   * 
   * @param formula La fórmula a expandir.
   * @returns La fórmula expandida.
   */

  expandFormula(formula: string): string {
    if (!formula.includes('(')) {
      return formula;
    }

    const elementCounts = this.countElements(formula);
    return this.formatExpandedFormula(elementCounts);
  }

  private countElements(formula: string): { [key: string]: number } {
    const elementGroups = formula.match(/([A-Z][a-z]*)(\d*)|(\(.+?\))(\d*)/g);
    const elementCounts: { [key: string]: number } = {};

    if (elementGroups) {
      elementGroups.forEach(group => {
        const elementMatch = group.match(/([A-Z][a-z]*)|(\(.+?\))(\d*)/);
        if (elementMatch) {
          const element = elementMatch[1] || elementMatch[2];
          const count = parseInt(elementMatch[3] || '1', 10);

          if (element.startsWith('(')) {
            this.expandInnerFormula(element, count, elementCounts);
          } else {
            this.addElementCount(element, count, elementCounts);
          }
        }
      });
    }

    return elementCounts;
  }

  private expandInnerFormula(element: string, count: number, elementCounts: { [key: string]: number }) {
    const innerFormula = element.slice(1, -1);
    const expandedInnerFormula = this.expandFormula(innerFormula);
    const innerElementGroups = expandedInnerFormula.match(/([A-Z][a-z]*)(\d*)/g);

    if (innerElementGroups) {
      innerElementGroups.forEach(innerGroup => {
        const innerElementMatch = innerGroup.match(/([A-Z][a-z]*)(\d*)/);
        if (innerElementMatch) {
          const innerElement = innerElementMatch[1];
          const innerCount = parseInt(innerElementMatch[2] || '1', 10) * count;
          this.addElementCount(innerElement, innerCount, elementCounts);
        }
      });
    }
  }

  private addElementCount(element: string, count: number, elementCounts: { [key: string]: number }) {
    if (element in elementCounts) {
      elementCounts[element] += count;
    } else {
      elementCounts[element] = count;
    }
  }

  private formatExpandedFormula(elementCounts: { [key: string]: number }): string {
    let expandedFormula = '';
    Object.keys(elementCounts).forEach(element => {
      expandedFormula += element + (elementCounts[element] > 1 ? elementCounts[element] : '');
    });
    return expandedFormula;
  }

  
  /**
   * Establece los espacios.
   */
  setSlots(): void {
    const formula = this.currentCompoundFormula || '';
    const elementSymbolPar = /[A-Z][a-z]?/g; // esto funciona de manera que primero seleciona una letra mayuscula y luego una minuscula para elementos como el Al o el Fe, Mg, etc..
    const elements = formula.match(elementSymbolPar) || []; //aca revisa que la formula tenga elementos y si no los tiene, devuelve un array vacio
    const uniqueElements = new Set(elements);
    this.elementCount = uniqueElements.size;
    this.slotsArray = Array(this.elementCount);
  }
  
  /**
   * Limpia los slots de contenido.
   */
  cleanSlots(): void {
    this.slots.forEach(slot => slot.clearSlotContent());

  }

  /**
   * Envía una acción y actualiza el estado de la variable 'change'.
   * @param event - El evento que contiene la opción booleana.
   */
  sendAction(event: { option: boolean }): void {
    this.change = event.option;
    if (this.change) {
      this.cleanSlots();
      setTimeout(() => {
        this.change = false; //esto porque desde el request.compound no detecta los cambios cuando el cambio es true y se pasa a false
      }, 1000);
    }
  }



  sameOrder(formula1: string, formula2: string): boolean {
    const sortedFormula1 = formula1.split('').sort().join('');
    const sortedFormula2 = formula2.split('').sort().join('');
    return sortedFormula1 === sortedFormula2;
  }

  compareFormulas(): void {
    console.log ('Fórmula actual: ', this.currentCompoundFormula);
    console.log ('Fórmula a crear: ', this.craftFormula);
    if (this.craftFormula === this.currentCompoundFormula) {
      console.log('Las fórmulas son iguales.');
      this.cleanSlots();
    } else if (this.sameOrder(this.craftFormula, this.currentCompoundFormula)) {
      console.log('Las fórmulas tienen los mismos símbolos pero en diferente orden.');
      this.cleanSlots();

    } else {
      console.log('Las fórmulas son diferentes.');
      this.cleanSlots();  
    }
    this.craftFormula = '';

  }


  craftCompound(): void { 
    this.slots.forEach(slot => {
      slot.getSlotContentString()
      const slotContent = slot.getSlotContentString();
      this.craftFormula += slotContent;
   });
   console.log(this.craftFormula);
  this.compareFormulas();
  }

}
