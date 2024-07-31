/**
*@Author Alejandro José Salazar Lobo
*/

import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IElement } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { ModalErrorComponent } from "../modal-error/modal-error.component";

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalErrorComponent],
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {
  @Input() element: { symbol: string; count: number } | null = null;
  @Output() error = new EventEmitter<{ title: string, text: string, isAlert: boolean, buttons: boolean }>();
  @Input() cleanSlot: boolean = false;
  counterValue: number = 0; 
  @ViewChild('modalError') modalError!: ModalErrorComponent;



  /**
   * Permite soltar un elemento arrastrado en el componente.
   * @param event - El evento de arrastre.
   */
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }



  /**
    * Maneja el evento de soltar un elemento en el componente de slot.
    * @param event El evento de arrastrar y soltar.
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const draggedElement: IElement = JSON.parse(data);
      if (this.element) {
        if (this.element.symbol === draggedElement.symbol) {
          this.element.count += 1; 
        } else {
          this.error.emit({ title: 'Alto ahí!!', text: 'No se pueden mezclar elementos diferentes en una misma casilla.', isAlert: true, buttons: false});
        }
      } else {
        this.element = {
          symbol: draggedElement.symbol || '', 
          count: 1
        };
      }
    }
  }



  /**
    * Maneja el evento de arrastre cuando se inicia el arrastre de un elemento.
    * Si el elemento tiene una cantidad mayor a cero, establece los datos de transferencia
    * con el símbolo del elemento en formato JSON. Luego, disminuye la cantidad del elemento en uno.
    * si esta en cero se elimina el elemento del slot.
    * @param event El evento de arrastre.
   */
  onDragStart(event: DragEvent): void {
    if (this.element && this.element.count > 0) {
      event.dataTransfer?.setData('text/plain', JSON.stringify({ symbol: this.element.symbol })); 
      this.element.count -= 1;
      if (this.element.count === 0) {
        setTimeout(() => {
          this.element = null;
        }, 200);
      }
    }
  }


/** Limpia el contenido del slot.
 */ 
  clearSlotContent() {
    this.element = null;
  }

  /**metodo para editar el valor del contador del elemento y cerrar el modal de edición del contador
  */
  editCounter(): void {
    if (this.counterValue <= 0) {
      this.element = null;
      this.modalError.closeModal()
    }else if (this.element) {
      this.element.count = this.counterValue;
      this.modalError.closeModal()
    }
  }

  /**metodo para mostrar el modal con el contenido de editar el contador del elemento
   */
  showEditCounter(): void {
    this.counterValue = this.element?.count || 0;
    this.modalError.showModal('', '', false, false);
}

}
