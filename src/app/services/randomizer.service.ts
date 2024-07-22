import { Injectable, inject, signal } from '@angular/core';
import { IElement } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService extends BaseService<IElement> {
  protected override source: string = 'elementEs';
  private itemListSignal = signal<IElement[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  Element: IElement[] = [];

  get items$() {
    return this.itemListSignal;
  }

  getRandomWord(): string {
    if (this.Element.length === 0) {
      console.error('Element is empty or not defined');
      return '';
    }
    const randomIndex = Math.floor(Math.random() * 118);
    console.log(this.itemListSignal)
    const item = this.Element[randomIndex];
    if (!item || !item.name) {
      console.error('Selected item is undefined or does not have a name property');
      return ''; // O maneja el error de otra manera según tus necesidades
    }
    return item.name;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
        this.Element = response;
      },
      error: (error: any) => {
        console.error('Error in get all elee request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public checkAndFetch() {
    if (this.Element.length === 0) {
      this.getAll();
    } else {
      const randomWord = this.getRandomWord();
      console.log('Random word:', randomWord);
    }
  }
}