/**
*@Author Guillermo Jiménez De Sárraga
*/
import { Component } from '@angular/core';
import { CrossWordComponent } from "../cross-word/cross-word.component";

@Component({
  selector: 'app-chem-cross',
  standalone: true,
  imports: [CrossWordComponent],
  templateUrl: './chem-cross.component.html',
  styleUrl: './chem-cross.component.scss'
})
export class ChemCrossComponent {

}
