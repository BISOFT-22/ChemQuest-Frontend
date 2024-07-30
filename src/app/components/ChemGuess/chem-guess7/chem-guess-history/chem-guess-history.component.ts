import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { IHistory } from '../../../../interfaces';

@Component({
  selector: 'app-chem-guess-history',
  standalone: true,
  imports: [CommonModule, FormsModule, ChemGuessHangManComponent],
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
