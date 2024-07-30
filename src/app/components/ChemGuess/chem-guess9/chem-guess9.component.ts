import { Component } from '@angular/core';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chem-guess9',
  standalone: true,
  imports: [NgbModule ],
  templateUrl: './chem-guess9.component.html',
  styleUrl: './chem-guess9.component.scss'
})
export class ChemGuess9Component {
  public items =  [
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    { word: "angular", hint: "A popular front-end framework" },
    { word: "typescript", hint: "A superset of JavaScript" },
    
  ];

  constructor(private modalService: NgbModal) {}




}

