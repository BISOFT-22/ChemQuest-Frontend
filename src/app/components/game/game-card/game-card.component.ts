
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() href: string = '';
}
