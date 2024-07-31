import { Component, Input, OnChanges, OnInit, SimpleChanges, viewChild, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from './chem-guess-hang-man/chem-guess-hang-man.component';

import { ModalPruebasComponent } from '../../../modal-pruebas/modal-pruebas.component';
import { CommonModule } from '@angular/common';

import { IElement, IHistory, IUser } from '../../../interfaces';
import { ChemGuessHistoryComponent } from './chem-guess-history/chem-guess-history.component';
import { LiveChangeService } from '../../../services/liveChange.service';

/**
 * Component for ChemGuess7.
 */
@Component({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalComponent, NgbModule, ChemGuessHangManComponent, ModalPruebasComponent, CommonModule, ChemGuessHistoryComponent],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component implements OnChanges {
  @ViewChild('modalPrueba') modalhistory!: ModalPruebasComponent;
  liveImg: string = 'assets/img/live/live100.png';
  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';
  public allHistory: IHistory[] = [];
  @Input() live: number | undefined;
  public streak: number | undefined = 0;

  constructor(private liveChangeService: LiveChangeService) {
  }

  /**
   * Shows the history modal.
   * @param modal - The modal component.
   */
  showHistory(modal: any): void {
    let visible: boolean = true;
    modal.show();
  }

  opcion: string = '';

  /**
   * Sets the selected word.
   * @param word - The selected word.
   */
  getWord(word: string): void {
    this.opcion = word;
  }

  /**
   * Changes the life image based on the current live value.
   */
  changeLife(): void {
    this.live = this.liveChangeService.live.value;

    switch (this.live) {
      case 5:
        this.liveImg = 'assets/img/live/live100.png';
        break;
      case 4:
        this.liveImg = 'assets/img/live/live75.png';
        break;
      case 3:
        this.liveImg = 'assets/img/live/live50.png';
        break;
      case 2:
        this.liveImg = 'assets/img/live/live25.png';
        break;
      case 1:
        this.liveImg = 'assets/img/live/live0.png';
        break;
      default:
        this.liveImg = 'assets/img/live/live100.png';
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.live = this.liveChangeService.live.value;
    console.log(this.live);
    const liveChange = changes['live'];
    if (liveChange && !liveChange.firstChange) {
      this.changeLife();
    }
  }
}
