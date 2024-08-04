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
import e from 'cors';

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
  lifeImg: string = 'assets/img/live/live100.png';



  imagePathHead: string = 'assets/img/exodia/Head.png';
  imagePathLeftArm: string = 'assets/img/exodia/ArmLeft.png';
  imagePathRigthArm: string = 'assets/img/exodia/ArmRight.png';
  imagePathLeftLeg: string = 'assets/img/exodia/LegLeft.png';
  imagePathRightLeg: string = 'assets/img/exodia/LegRight.png';
  //////////////////////////////////////////////
  hangManWhite: string = 'assets/img/exodia/scientific.png';
  hangSkeletonWhite: string = 'assets/img/exodia/scientific.png';

  //////////////////////////////////////////
  /////////100 de vida//////////////////////
  hangMan5: string = 'assets/img/exodia/scientific.gif';
  //////////////////////////////////////////
  /////////75 de vida//////////////////////
  hangMan4: string = 'assets/img/exodia/scientific.gif';
  //////////////////////////////////////////
  /////////50 de vida//////////////////////
  Hangman3: string = 'assets/img/exodia/scientific.gif';
  //////////////////////////////////////////
  /////////25 de vida//////////////////////
  hangMan2: string = 'assets/img/exodia/scientific.gif';
  //////////////////////////////////////////
  /////////1 de vida//////////////////////
  hangMan1: string = 'assets/img/exodia/HangmanMuerte.gif';
  //////////////////////////////////////////
  /////////0 de vida//////////////////////
  Died: string = 'assets/img/exodia/HangmanMuerte.gif';
  //////////////////////////////////////////
  public allHistory: IHistory[] = [];
  @Input() life: number | undefined;
  public streak: number | undefined=0;
  public change: boolean = false;
  user:IUser = {};
  constructor(private lifeChangeService: LifeChangeService, private authService:AuthService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.imagePathHead = 'assets/img/bocaAbajo.jpg';
    this.imagePathLeftArm = 'assets/img/bocaAbajo.jpg';
    this.imagePathRigthArm = 'assets/img/bocaAbajo.jpg';  
    this.imagePathLeftLeg = 'assets/img/bocaAbajo.jpg';
    this.imagePathRightLeg = 'assets/img/bocaAbajo.jpg';

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
    console.log(this.user.streak);
    let visible: boolean = true;
    modal.show();
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
 
    if (this.life == 5) {
      this.hangMan5 = this.hangMan5;
    }else if(this.life == 4){
      this.hangMan5 = this.hangMan4;
    }else if(this.life == 3){
      this.hangMan5 = this.Hangman3;
    }
    else if(this.life == 2){
      this.hangMan5 = this.hangMan2;
    }else if(this.life == 1){
      this.hangMan5 = this.hangMan1;
    }else if(this.life == 0){
      this.hangMan5 = this.Died;
    }
      
     
    
  }
  // changeLife(): void {
  //   this.life = this.lifeChangeService.life.value;
 
  //   if (this.life === 6) {
    
  //     this.scientific 
  //      } else if(this.life === 5) {
  //       this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
  //      }else if(this.life === 4) {
       
  //       this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
  //       this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
        
        
  //      }else if(this.life === 3) {  
       
  //       this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
  //       this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
  //       this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png';  
  //      } else if(this.life === 2) {
       
  //       this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
  //       this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
  //       this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png'; 
  //       this.imagePathRightLeg = 'assets/img/exodia/LegRight.png';
  //      }
  //      else if(this.life === 1) {
        
  //       this.imagePathLeftArm = 'assets/img/exodia/ArmLeft.png';
  //       this.imagePathRigthArm = 'assets/img/exodia/ArmRight.png';
  //       this.imagePathLeftLeg = 'assets/img/exodia/LegLeft.png'; 
  //       this.imagePathRightLeg = 'assets/img/exodia/LegRight.png';
  //       this.imagePathHead = 'assets/img/exodia/Head.png';
  //      }
     
    
  // }

  


  // GJDES
  OnTimeComplete() {
    alert("Time is over");
  }
}
