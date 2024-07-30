import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IElement } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElementService extends BaseService<IElement> {
  protected override source: string = 'elementEs';
  private elementListSignal = signal<IElement[]>([]);

  get elements$() {
    return this.elementListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.elementListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching elements', error);
      }
    });
  }

  saveElementSignal(element: IElement): Observable<any> {
    return this.add(element).pipe(
      tap((response: any) => {
        this.elementListSignal.update(elements => [response, ...elements]);
      }),
      catchError(error => {
        console.error('Error saving element', error);
        return throwError(error);
      })
    );
  }

  updateElementSignal(element: IElement): Observable<any> {
    return this.edit(element.id, element).pipe(
      tap((response: any) => {
        const updatedElements = this.elementListSignal().map(e => e.id === element.id ? response : e);
        this.elementListSignal.set(updatedElements);
      }),
      catchError(error => {
        console.error('Error updating element', error);
        return throwError(error);
      })
    );
  }

  deleteElementSignal(element: IElement): Observable<any> {
    return this.del(element.id).pipe(
      tap((response: any) => {
        const updatedElements = this.elementListSignal().filter(e => e.id !== element.id);
        this.elementListSignal.set(updatedElements);
      }),
      catchError(error => {
        console.error('Error deleting element', error);
        return throwError(error);
      })
    );
  }
}
