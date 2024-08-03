import { Component, Input, OnChanges, OnInit, SimpleChanges, viewChild, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from './chem-guess-hang-man/chem-guess-hang-man.component';

import { ModalPruebasComponent } from '../../../modal-pruebas/modal-pruebas.component';
import { CommonModule } from '@angular/common';

import { IElement, IHistory, IUser } from '../../../interfaces';
import { ChemGuessHistoryComponent } from './chem-guess-history/chem-guess-history.component';
import { LiveChangeService } from '../../../services/liveChange.service';
import { TimerComponent } from "../../timer/timer.component";

/**
 * Component for ChemGuess7.
 */
@Component({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalComponent, NgbModule, ChemGuessHangManComponent, ModalPruebasComponent, CommonModule, ChemGuessHistoryComponent, TimerComponent],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component implements OnChanges, OnInit {
  @ViewChild('modalPrueba') modalhistory!: ModalPruebasComponent;
  liveImg: string = 'assets/img/live/live100.png';



  imagePathHead: string = 'assets/img/exodia/Head.png';
  imagePathLeftArm: string = 'assets/img/exodia/ArmLeft.png';
  imagePathRigthArm: string = 'assets/img/exodia/ArmRight.png';
  imagePathLeftLeg: string = 'assets/img/exodia/LegLeft.png';
  imagePathRightLeg: string = 'assets/img/exodia/LegRight.png';
 
  public allHistory: IHistory[] = [];
  @Input() live: number | undefined;
  public streak: number | undefined=0;
  public change: boolean = false;

  constructor(private liveChangeService: LiveChangeService) {
  }
  ngOnInit(): void {
    this.imagePathHead = 'assets/img/bocaAbajo.jpg';
    this.imagePathLeftArm = 'assets/img/bocaAbajo.jpg';
    this.imagePathRigthArm = 'assets/img/bocaAbajo.jpg';  
    this.imagePathLeftLeg = 'assets/img/bocaAbajo.jpg';
    this.imagePathRightLeg = 'assets/img/bocaAbajo.jpg';
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
 
    if (this.live === 6) {
    
      this.imagePathLeftArm = 'assets/img/bocaAbajo.jpg';
       } else if(this.live === 5) {
        this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
       }else if(this.live === 4) {
       
        this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
        this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
        
        
       }else if(this.live === 3) {  
       
        this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
        this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
        this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png';  
       } else if(this.live === 2) {
       
        this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
        this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
        this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png'; 
        this.imagePathRightLeg = 'assets/img/exodia/LegRight.png';
       }
       else if(this.live === 1) {
        
        this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
        this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
        this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png'; 
        this.imagePathRightLeg = 'assets/img/exodia/LegRight.png';
        this.imagePathHead = 'assets/img/exodia/Head.png';
       }
     
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.live = this.liveChangeService.live.value;
    if (changes) {
      this.allHistory=[];
    }
    console.log(this.live);
    const liveChange = changes['live'];
    if (liveChange && !liveChange.firstChange) {
      this.changeLife();
    }
  }
}
