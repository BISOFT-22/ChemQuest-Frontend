import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    ModalComponent,
    RouterOutlet
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent{

}
