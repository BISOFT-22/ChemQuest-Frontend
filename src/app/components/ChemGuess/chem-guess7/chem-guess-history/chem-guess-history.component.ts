import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IHistory } from '../../../../interfaces';

@Component({
  selector: 'app-chem-guess-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chem-guess-history.component.html',
  styleUrl: './chem-guess-history.component.scss'
})
export class ChemGuessHistoryComponent {
  @Output() callHistoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() allHistory: IHistory[] = [];

  showHistory() {
    this.allHistory.forEach((history: IHistory) => {
      console.log(history);
    });
  }
  callEvent() {
    this.callHistoryEvent.emit(true);
  }
  see(){
    console.log(this.allHistory)
  }
  
}
