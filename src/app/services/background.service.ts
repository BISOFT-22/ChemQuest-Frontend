import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
private backgroundSource = new BehaviorSubject<string>('default');
background$ = this.backgroundSource.asObservable();
bgChemcraft = 'assets/img/chemcraft/bgChemcraft-light.png';

 

  changeBackground(url: string) {
    this.backgroundSource.next(url);
  }
}