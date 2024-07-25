import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChemGuessHistoryComponent } from "../components/ChemGuess/chem-guess-history/chem-guess-history.component";

@Component({
  selector: 'app-modal-pruebas',
  standalone: true,
  imports: [CommonModule, ChemGuessHistoryComponent],
  templateUrl: './modal-pruebas.component.html',
  styleUrl: './modal-pruebas.component.scss'
})
export class ModalPruebasComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  isVisible: boolean = false;  
  buttonsVisible: boolean = false;



  showModal(visible:boolean): void {
    if (visible) {
      this.isVisible = true;
    }
    
    
  }

  closeModal(): void {
    this.isVisible = false;
  }
}
