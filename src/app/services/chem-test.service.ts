import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IChemTest } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChemTestService extends BaseService<IChemTest> {
  protected override source: string = 'chemTests';
  private chemTestListSignal = signal<IChemTest[]>([]);

  get chemTests$() {
    return this.chemTestListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.chemTestListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching chem tests', error);
      }
    });
  }

  saveChemTestSignal(chemTest: IChemTest): Observable<any> {
    return this.add(chemTest).pipe(
      tap((response: any) => {
        this.chemTestListSignal.update(chemTests => [response, ...chemTests]);
      }),
      catchError(error => {
        console.error('Error saving chem test', error);
        return throwError(error);
      })
    );
  }

  updateChemTestSignal(chemTest: IChemTest): Observable<any> {
    return this.edit(chemTest.id, chemTest).pipe(
      tap((response: any) => {
        const updatedChemTests = this.chemTestListSignal().map(ct => ct.id === chemTest.id ? response : ct);
        this.chemTestListSignal.set(updatedChemTests);
      }),
      catchError(error => {
        console.error('Error updating chem test', error);
        return throwError(error);
      })
    );
  }

  deleteChemTestSignal(chemTest: IChemTest): Observable<any> {
    return this.del(chemTest.id).pipe(
      tap((response: any) => {
        const updatedChemTests = this.chemTestListSignal().filter(ct => ct.id !== chemTest.id);
        this.chemTestListSignal.set(updatedChemTests);
      }),
      catchError(error => {
        console.error('Error deleting chem test', error);
        return throwError(error);
      })
    );
  }
}
