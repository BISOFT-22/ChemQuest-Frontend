/**
*@Author Guillermo Jiménez De Sárraga
*/
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

  @Input() dictionary: string[][] = [];
  @Input() id_language: number = 0; //0: English 1:Spanish
  @Input() id_message: number = 0; 
  @Input() wordList: string[] = ["word1", "word2", "word3"];

  get heading(): string { 
    return this.dictionary[this.id_language][this.id_message];
  }

  constructor() { }
}
