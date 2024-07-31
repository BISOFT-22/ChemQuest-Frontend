/**
*@Author Alejandro José Salazar Lobo
*/

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})

export class ModalErrorComponent {
  /**
   * Título del modal.
   */
  @Input() title: string = '';

  /**
   * Texto del modal.
   */
  @Input() text: string = '';

  /**
   * Evento que se emite cuando se realiza una acción en el modal.
   */
  @Output() action = new EventEmitter<{option: boolean}>();

  /**
   * Indica si el modal está visible o no.
   */
  isVisible: boolean = false;  

  /**
   * Indica si el modal es de tipo alerta.
   */
  isAlert: boolean = false;

  /**
   * Indica si los botones del modal están visibles.
   */
  buttonsVisible: boolean = false;

  /**
   * Indica si se muestra el botón de aceptar.
   */
  accept: boolean = true;

  /**
   * Indica si se muestra el botón de cancelar.
   */
  cancel: boolean = false;

  /**
   * Muestra el modal con el título, texto, tipo de alerta y visibilidad de los botones especificados.
   * @param title - El título del modal.
   * @param text - El texto del modal.
   * @param isAlert - Indica si el modal es de tipo alerta.
   * @param buttons - Indica si los botones del modal están visibles.
   */
  showModal(title: string, text: string, isAlert: boolean, buttons: boolean): void {
    console.log('Estoy en el modal')
    this.title = title;
    this.text = text;
    this.isVisible = true;
    this.isAlert = isAlert;
    if(buttons){
      this.buttonsVisible = true;
    } else {
      this.buttonsVisible = false;
    }
  }

  /**
   * Cierra el modal.
   */
  closeModal(): void {
    this.isVisible = false;
    this.isAlert = false;
  }

  /**
   * Maneja el evento de clic en un botón del modal.
   * @param option - La opción seleccionada.
   */
  onButtonClick(option : boolean): void {
    this.action.emit({option});
    this.closeModal();
  } 
}