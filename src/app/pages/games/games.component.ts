import { Component, OnInit, inject } from '@angular/core';
import { GameListComponent } from '../../components/game/game-list/game-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IGame } from '../../interfaces';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { GameFormComponent } from '../../components/game/game-form/game-form.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    GameListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    GameFormComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent{
  public gameService: GameService = inject(GameService);


  constructor() {
    this.gameService.getAll();
  }

  handleFormAction(item: IGame) {
    this.gameService.save(item);
  }


}
