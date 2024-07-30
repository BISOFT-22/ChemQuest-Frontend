import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Output() action = new EventEmitter<{option: boolean}>();
  isVisible: boolean = false;  
  buttonsVisible: boolean = false;
  accept: boolean = true;
  cancel: boolean = false;



  showModal(title: string, text: string, buttons: boolean): void {
    this.title = title;
    this.text = text;
    this.isVisible = true;
    if(buttons){
    this.buttonsVisible = true;
    }
  }

  closeModal(): void {
    this.isVisible = false;
  }


  onButtonClick(option : boolean): void {
    console.log('Action done');
    this.action.emit({option});
    this.closeModal();
  } 
}