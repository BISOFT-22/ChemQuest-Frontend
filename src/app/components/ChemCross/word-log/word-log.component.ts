import { CommonModule, NgFor } from '@angular/common';
import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'app-word-log',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './word-log.component.html',
  styleUrl: './word-log.component.scss'
})
export class WordLogComponent {

  @Input() wordList: string[] = [];
}
