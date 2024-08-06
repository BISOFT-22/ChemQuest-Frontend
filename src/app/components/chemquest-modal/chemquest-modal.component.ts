/**
*@Author Alejandro José Salazar Lobo
*/

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-chemquest-modal',
  standalone: true,
  imports: [],
  templateUrl: './chemquest-modal.component.html',
  styleUrl: './chemquest-modal.component.scss'
})
export class ChemquestModalComponent {


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
   * Indica si los boton de aceptar del modal está visible.
   */
  buttonAcceptVisible: boolean = false;

   
  /**
   * Indica si el boton "x" de salir del modal está visible.
   */
  buttonCloseVisible: boolean = false;

   

    /**
   * Indica si los boton de cancelar del modal está visible.
   */
  buttonCancelVisible: boolean = false;

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
  showModal(title: string, text: string, isAlert: boolean, buttonAccept: boolean, buttonCancel: boolean, buttonClose: boolean): void {
    this.title = title;
    this.text = text;
    this.isVisible = true;
    this.isAlert = isAlert;

    if(buttonClose){
      this.buttonCloseVisible = true;
    } else {
      this.buttonCloseVisible = false;
    }

    if(buttonAccept){
      this.buttonAcceptVisible = true;
    } else {
      this.buttonAcceptVisible = false;
    }
    if(buttonCancel){
      this.buttonCancelVisible = true;
    } else {
      this.buttonCancelVisible = false;
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
    if(this.buttonAcceptVisible && this.buttonCancelVisible){
      this.action.emit({option});
    }
    this.closeModal();
  } 
}