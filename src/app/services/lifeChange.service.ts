import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHistory } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LifeChangeService {

    public life = new BehaviorSubject<number>(5);
   
    setLive(livetemp: number) {
        this.life.next(livetemp);
        return this.life.asObservable();
    }

    

}