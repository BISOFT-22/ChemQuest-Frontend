import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IHistory } from '../../../../interfaces';

/**
 * Component for displaying the history of chemical guesses.
 */
@Component({
  selector: 'app-chem-guess-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chem-guess-history.component.html',
  styleUrl: './chem-guess-history.component.scss'
})
export class ChemGuessHistoryComponent {
  /**
   * Event emitter for calling the history event.
   */
  @Output() callHistoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Input property for the array of all history items.
   */
  @Input() allHistory: IHistory[] = [];

  /**
   * Displays the history by logging each history item to the console.
   */
  showHistory() {
    this.allHistory.forEach((history: IHistory) => {
      console.log(history);
    });
  }

  /**
   * Calls the history event by emitting a boolean value.
   */
  callEvent() {
    this.callHistoryEvent.emit(true);
  }

  /**
   * Logs the array of all history items to the console.
   */
  see() {
    console.log(this.allHistory);
  }
}
