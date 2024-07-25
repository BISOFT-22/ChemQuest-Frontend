import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  isVisible: boolean = false;

  showModal(title: string, text: string): void {
    this.title = title;
    this.text = text;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }
}