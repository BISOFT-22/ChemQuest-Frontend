import { Component, Input, OnChanges, OnInit, SimpleChanges, viewChild, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from './chem-guess-hang-man/chem-guess-hang-man.component';

import { ModalPruebasComponent } from '../../../modal-pruebas/modal-pruebas.component';
import { CommonModule } from '@angular/common';

import { IElement, IHistory, IUser } from '../../../interfaces';
import { ChemGuessHistoryComponent } from './chem-guess-history/chem-guess-history.component';
import { LifeChangeService} from '../../../services/lifeChange.service';
import { TimerComponent } from "../../timer/timer.component";
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { ChemquestModalComponent } from "../../chemquest-modal/chemquest-modal.component";
import { ModalTimeEndComponent } from 'app/modal-time-end/modal-time-end.component';

/**
 * Component for ChemGuess7.
 */
@Component({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ NgbModule, ChemGuessHangManComponent, CommonModule, ChemGuessHistoryComponent, TimerComponent, ChemquestModalComponent,ModalTimeEndComponent],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component implements OnChanges, OnInit {
  @ViewChild('modalHistory') modalhistory!: ChemquestModalComponent;
  @ViewChild('timer') timer!: TimerComponent;
  @ViewChild('modalTimeEnd') timeEnd!: ChemquestModalComponent;
  handleAllHistoryCleared(): void {
    this.allHistory = [];
  }
 
  
  lifeImg: string = 'assets/img/live/live100.png';



  imagePathHead: string = 'assets/img/exodia/Head.png';
  imagePathLeftArm: string = 'assets/img/exodia/ArmLeft.png';
  imagePathRigthArm: string = 'assets/img/exodia/ArmRight.png';
  imagePathLeftLeg: string = 'assets/img/exodia/LegLeft.png';
  imagePathRightLeg: string = 'assets/img/exodia/LegRight.png';

  // //////////////////////////////////////////
  // /////////100 de vida//////////////////////
  // hangMan5: string = 'assets/img/exodia/Hangman5.gif';
  // //////////////////////////////////////////
  // /////////75 de vida//////////////////////
  // hangMan4: string = 'assets/img/exodia/Hangman4.gif';
  // //////////////////////////////////////////
  // /////////50 de vida//////////////////////
  // hangMan3: string = 'assets/img/exodia/Hangman3.gif';
  // //////////////////////////////////////////
  // /////////25 de vida//////////////////////
  // hangMan2: string = 'assets/img/exodia/Hangman2.gif';
  // //////////////////////////////////////////
  // /////////1 de vida//////////////////////
  // hangMan1: string = 'assets/img/exodia/Hangman1.gif';
  // //////////////////////////////////////////
  // /////////0 de vida//////////////////////
  // Died: string = 'assets/img/exodia/HangmanMuerte.gif';
  //////////////////////////////////////////

   hangMan: string = 'assets/img/exodia/Hangman5.gif';
   
  public allHistory: IHistory[] = [];
  @Input() life: number | undefined;
  public streak: number | undefined=0;
  public change: boolean = false;
  user:IUser = {};
  constructor(private lifeChangeService: LifeChangeService, private authService:AuthService, private userService: UserService) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.timer.startTimer();
    }, 100);
    this.setUser();
  }
  setUser(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
      
    }
  }
  /**
   * Shows the history modal.
   * @param modal - The modal component.
   */
  showHistory(modal: any): void {
 
    let visible: boolean = true;
    this.modalhistory.showModal('','',false, false, false);
  }
  ShowTimeEnd(modal: any): void {
    modal.showModal('PERDISTE','Dale aceptar si quieres volver a intentar o cancelar para seleccionar otro juego',true, true, true);
  }
  comprobation(modal: any): void {
    let show = this.life;
    if (show !== undefined && show < 5) {
      this.showHistory(modal);
    }
  }

  opcion: string = '';

  /**
   * Sets the selected word.
   * @param word - The selected word.
   */
  getWord(word: string): void {
    this.opcion = word;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.life = this.lifeChangeService.life.value;
    if (changes) {
      this.allHistory=[];
    }
    console.log(this.life);
    const liveChange = changes['life'];
    if (liveChange && !liveChange.firstChange) {
      this.changeLife();
    }
  }
  /**
   * Changes the life image based on the current live value.
   */
  changeLife(): void {
    this.life = this.lifeChangeService.life.value;
 
    if (this.life === 5) {
    this.hangMan = 'assets/img/exodia/Hangman5.gif';
      
       } else if(this.life === 4) {
        this.hangMan = 'assets/img/exodia/Hangman4.gif';
       }else if(this.life === 3) {
       
       this.hangMan = 'assets/img/exodia/Hangman3.gif';
        
        
       }else if(this.life === 2) {  
       
       this.hangMan = 'assets/img/exodia/Hangman2.gif';
       } else if(this.life === 1) {
       
        this.hangMan = 'assets/img/exodia/Hangman1.gif';
       }
  }

  


  // GJDES
  OnTimeComplete(modal: any): void {
    this.ShowTimeEnd(modal);
  }
}
