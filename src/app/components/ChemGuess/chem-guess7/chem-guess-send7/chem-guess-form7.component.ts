import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


/**
 * Component for sending chemical guesses.
 */
@Component({
  selector: 'app-chem-guess-send',
  standalone: true,
  imports: [CommonModule,
            FormsModule,

          ],
  templateUrl: './chem-guess-send.component.html',
  styleUrl: './chem-guess-send.component.scss'
})
export class ChemGuessSendComponent {

  /**
   * Event emitter for notifying parent component.
   */
  @Output() callParentEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  /**
   * Emits the callParentEvent event with a value of true.
   */
  callEvent() {
    this.callParentEvent.emit(true);
    console.log("estoy emitiendo");
  }
 
}
