import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGame } from '../../../../interfaces';

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

  @Output() callParentEvent: EventEmitter<boolean> = new EventEmitter<boolean>()

  callEvent() {
    this.callParentEvent.emit(true);
    console.log("estoy emitiendo");
  }
 
}
