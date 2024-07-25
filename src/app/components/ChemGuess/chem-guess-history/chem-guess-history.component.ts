import { Component, EventEmitter, Output } from '@angular/core';
import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { IHistory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chem-guess-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chem-guess-history.component.html',
  styleUrl: './chem-guess-history.component.scss'
})
export class ChemGuessHistoryComponent {
  @Output() callParentEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  allHistory :IHistory[] =[];

  callEvent() {
    this.callParentEvent.emit(true);
  }

  handleHistoryChange(newHistory: IHistory[]) {
    this.allHistory = newHistory;
  }
}
