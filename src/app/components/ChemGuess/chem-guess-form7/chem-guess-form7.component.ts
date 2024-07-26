import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGame } from '../../../interfaces';

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

  @Output() callParentEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  callEvent() {
    this.callParentEvent.emit(true);
    console.log("estoy emitiendo");
  }
}
