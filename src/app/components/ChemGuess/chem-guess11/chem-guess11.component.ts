import { Component } from '@angular/core';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chem-guess11',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './chem-guess11.component.html',
  styleUrl: './chem-guess11.component.scss'
})
export class ChemGuess11Component {
  imagePath: string = 'assets/img/magoscuro.jpeg';
  imagePathAzules: string = 'assets/img/ojosazules.jpeg';
  imagePathAbajo: string = 'assets/img/bocaAbajo.jpg';


  constructor(private modalService: NgbModal) {}



}
