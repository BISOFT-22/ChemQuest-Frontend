import { Component } from '@angular/core';
import { CrossCellComponent } from "../cross-cell/cross-cell.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cross-word',
  standalone: true,
  imports: [CrossCellComponent, CommonModule],
  templateUrl: './cross-word.component.html',
  styleUrl: './cross-word.component.scss'
})
export class CrossWordComponent {

  crossSize: number = 10;
  fakeArray: number[] = new Array(this.crossSize);

}
