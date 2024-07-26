import { Injectable, inject, signal } from '@angular/core';
import { IElement } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RandomizerService extends BaseService<IElement> {
  protected override source: string = 'elementEs';
  private itemListSignal = signal<IElement[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private elementsSubject = new BehaviorSubject<IElement[]>([]);

  get items$() {
    return this.elementsSubject.asObservable();
  }

  getRandomWord(): string {
    if (this.elementsSubject.getValue().length === 0) {
      console.error('Element is empty or not defined');
      return '';
    }
    const randomIndex = Math.floor(Math.random() * this.elementsSubject.getValue().length);
    
    const item = this.elementsSubject.getValue()[randomIndex];
    if (!item || !item.name) {
      console.error('Selected item is undefined or does not have a name property');
      return ''; // O maneja el error de otra manera según tus necesidades
    }
    return item.name;
  }
  getRandomElement(): IElement | undefined {
    if (this.elementsSubject.getValue().length === 0) {
      console.error('Element is empty or not defined');
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * 118);
  
    const item = this.elementsSubject.getValue()[randomIndex];
  
    return item;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
        this.elementsSubject.next(response);
      },
      error: (error: any) => {
        console.error('Error in get all element request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public checkAndFetch() {
    if (this.elementsSubject.getValue().length === 0) {
      this.getAll();
    } 
  }
}