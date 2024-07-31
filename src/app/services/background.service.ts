/**
*@Author Alejandro José Salazar Lobo
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
private backgroundSource = new BehaviorSubject<string>('default');
background$ = this.backgroundSource.asObservable();

  /**
   * Cambia el fondo de la aplicación.
   * 
   * @param url La URL de la imagen de fondo.
   */
  changeBackground(url: string) {
    this.backgroundSource.next(url);
  }
}