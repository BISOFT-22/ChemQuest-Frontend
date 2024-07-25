import { Component, ViewChild  } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChemGuessHangManComponent } from '../chem-guess-hang-man/chem-guess-hang-man.component';
import { RandomizerService } from '../../../services/randomizer.service';
import { ModalBComponent } from '../../../modal-b/modal-b.component';
import { ChemGuessForm7Component} from '../chem-guess-form7/chem-guess-form7.component';

@Component ({
  selector: 'app-chem-guess7',
  standalone: true,
  imports: [ModalBComponent, NgbModule, ChemGuessHangManComponent, ChemGuessForm7Component ],
  templateUrl: './chem-guess7.component.html',
  styleUrl: './chem-guess7.component.scss'
})
export class ChemGuess7Component {

  live100: string = 'assets/img/live/live100.png';
  live75: string = 'assets/img/live/live75.png';
  live50: string = 'assets/img/live/live50.png';
  live25: string = 'assets/img/live/live25.png';
  live0: string = 'assets/img/live/live0.png';

  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';

  
  strike: number=0;
/////////////////////////











////////////////////////
  
  

opcion: string='';


 

  getWord(word:string){
    this.opcion = word;
  }


 
}
 


