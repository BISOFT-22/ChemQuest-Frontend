/**
*@Author Alejandro José Salazar Lobo
*/
import { Injectable, inject, signal } from '@angular/core';
import { ICompound } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompoundService extends BaseService<ICompound> {
  protected override source: string = 'compounds';
  private compoundListSignal = signal<ICompound[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get compounds$() {
    return this.compoundListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.compoundListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error in get all compounds request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public save(item: ICompound) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.compoundListSignal.update((compounds: ICompound[]) => [response, ...compounds]);
      },
      error: (error: any) => {
        console.error('Error in save compound request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public update(item: ICompound) {
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.compoundListSignal().map(compound => compound.id === item.id ? item : compound);
        this.compoundListSignal.set(updatedItems);
      },
      error: (error: any) => {
        console.error('Error in update compound request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public delete(item: ICompound) {
    this.del(item.id).subscribe({
      next: () => {
        this.compoundListSignal.set(this.compoundListSignal().filter(compound => compound.id != item.id));
      },
      error: (error: any) => {
        console.error('Error in delete compound request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
