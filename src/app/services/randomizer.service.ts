import { Injectable, inject, signal } from '@angular/core';
import { IGame } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService extends BaseService<IGame>{
  protected override  source: string = 'games';
  private itemListSignal = signal<[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private wordsList: { id: number, word: string }[] = [
    { id: 1, word: 'apple' },
    { id: 2, word: 'banana' },
    { id: 3, word: 'cherry' },
    { id: 4, word: 'date' },
    { id: 5, word: 'elderberry' }
  ];

  get items$ () {
    return this.itemListSignal;
  }





  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * this.wordsList.length);
    const itemListSignal= this.wordsList[randomIndex];
    return itemListSignal.word;
  }





}
