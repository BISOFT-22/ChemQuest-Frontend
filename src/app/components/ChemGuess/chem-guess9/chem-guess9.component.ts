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
export class ChemGuess9Component {
  compoundsList: ICompound[] = []
  compound: ICompound = {};
  compoundOptions: ICompound[] = []
  public items =  [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    
  ];

  constructor(private modalService: NgbModal, private compoundService: CompoundService) {
    this.compoundService.getAll();
    effect(() => {      
      this.compoundsList = this.compoundService.compounds$();
    });
  }
  

  getRamdonCompound(): void {
    if (this.compoundsList.length === 0) {
      throw new Error('Compound list is empty');
    }
    const randomIndex = Math.floor(Math.random() * this.compoundsList.length);
    this.compound = this.compoundsList[randomIndex];
  }
  chargeOptions(){
    for (let index = 0; index < 3; index++) {
      this.getRamdonCompound
      this.compoundOptions.push(this.compound);
    }
    
}
}

