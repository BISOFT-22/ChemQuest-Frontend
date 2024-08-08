import { Component, effect, OnInit } from '@angular/core';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ICompound } from 'app/interfaces';
import { CompoundService } from 'app/services/compound.service';

@Component({
  selector: 'app-chem-guess9',
  standalone: true,
  imports: [NgbModule ],
  templateUrl: './chem-guess9.component.html',
  styleUrl: './chem-guess9.component.scss'
})
export class ChemGuess9Component implements OnInit {
  compoundsList: ICompound[] = []
  compoundOptions: ICompound[] = []
  visible = true;

  constructor(private modalService: NgbModal, private compoundService: CompoundService) {
    this.compoundService.getAll();
    effect(() => {      
      this.compoundsList = this.compoundService.compounds$();
    });
  }
  ngOnInit(): void {
   

    
  }
  

  getRamdonCompound(): ICompound {
    let compound: ICompound;
    if (this.compoundsList.length === 0) {
      throw new Error('Compound list is empty');
    }
    const randomIndex = Math.floor(Math.random() * this.compoundsList.length);
    return compound = this.compoundsList[randomIndex];
  }
  chargeOptions(){
    this.visible = false;
    
    let compound: ICompound;
    console.log(this.compoundsList);
    for (let index = 0; index < 3; index++) {
      compound =this.getRamdonCompound();
      this.compoundOptions.push(compound);
    }
    
}
}

