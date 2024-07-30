import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [],
  templateUrl: './card-team.component.html',
  styleUrl: './card-team.component.scss'
})
export class CardTeamComponent {
  @Input() name!: string;
  @Input() role!: string;
  @Input() imageUrl!: string;

  constructor() { }
}
