import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.scss'
})
export class LanguageSelectComponent {
  
  @Input() dictionary: string[][] = [];
  @Input() id_language: number = 0; //0: English 1:Spanish
  @Input() id_message: number = 0; 
  
  @Output() langChangd = new EventEmitter<number>();
  
  LanguageChanged(e: Event) {
    let id_language = Number((e.target as HTMLSelectElement).value);
    this.langChangd.emit(id_language);
  }
}
