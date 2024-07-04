import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGame } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss'
})
export class GameFormComponent {
  @Input() game: IGame =  {};
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IGame> = new EventEmitter<IGame>()

  callEvent() {
    this.callParentEvent.emit(this.game);
  }

}
