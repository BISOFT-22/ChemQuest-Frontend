import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from "../../components/timer/timer.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    ModalComponent,
    RouterOutlet,
    TimerComponent
],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent{

}
