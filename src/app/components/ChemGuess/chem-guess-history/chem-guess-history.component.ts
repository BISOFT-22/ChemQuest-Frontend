import { Component, EventEmitter, Output } from '@angular/core';
import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { IHistory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chem-guess-history',
  standalone: true,
  imports: [CommonModule, FormsModule, ChemGuessHangManComponent],
  templateUrl: './chem-guess-history.component.html',
  styleUrl: './chem-guess-history.component.scss'
})
export class ChemGuessHistoryComponent {
  @Output() callHistoryEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  allHistory: IHistory[] = [];

  callEvent() {
    this.callHistoryEvent.emit(true);
  }

  handleHistoryChange(newHistory: IHistory[]) {
    this.see();
  }

  see(){
    console.log(this.allHistory)
  }
  
}
