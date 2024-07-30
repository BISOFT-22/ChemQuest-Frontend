import { Component } from '@angular/core';
import { CardProjectComponent } from "../../components/landing-nakamura/card-project/card-project.component";
import { CardTeamComponent } from "../../components/landing-nakamura/card-team/card-team.component";

@Component({
  selector: 'app-landing-nakamura',
  standalone: true,
  imports: [
    CardProjectComponent,
    CardTeamComponent
],
  templateUrl: './landing-nakamura.component.html',
  styleUrls: ['./landing-nakamura.component.scss']
})
export class LandingNakamuraComponent {
}