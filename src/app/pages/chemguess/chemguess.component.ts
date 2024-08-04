import { Component } from '@angular/core';
import { ChemGuess10Component } from 'app/components/ChemGuess/chem-guess10/chem-guess10.component';
import { ChemGuess11Component } from 'app/components/ChemGuess/chem-guess11/chem-guess11.component';
import { ChemGuess7Component } from 'app/components/ChemGuess/chem-guess7/chem-guess7.component';
import { ChemGuess8Component } from 'app/components/ChemGuess/chem-guess8/chem-guess8.component';
import { ChemGuess9Component } from 'app/components/ChemGuess/chem-guess9/chem-guess9.component';
import { ModalErrorComponent } from "../../components/chemcraft/modal-error/modal-error.component";
import { GameCardComponent } from "../../components/game/game-card/game-card.component";

@Component({
  selector: 'app-chemguess',
  standalone: true,
  imports: [ChemGuess7Component, ChemGuess8Component, ChemGuess9Component, ChemGuess10Component, ChemGuess11Component, ModalErrorComponent, GameCardComponent],
  templateUrl: './chemguess.component.html',
  styleUrl: './chemguess.component.scss'
})
export class ChemguessComponent {
level: number = 7;


onLevelChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.level = parseInt(selectElement.value, 10);
}


}
