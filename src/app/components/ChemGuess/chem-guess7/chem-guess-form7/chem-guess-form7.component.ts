import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


/**
 * Represents the ChemGuessForm7Component.
 */
@Component({
  selector: 'app-chem-guess-form7',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
          ],
  templateUrl: './chem-guess-form7.component.html',
  styleUrl: './chem-guess-form7.component.scss'
})
export class ChemGuessForm7Component {
 

  /**
   * Event emitter for calling the parent component.
   */
  @Output() callParentEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  /**
   * Calls the parent event and emits a boolean value.
   */
  callEvent() {
    this.callParentEvent.emit(true);
 
  }
}
