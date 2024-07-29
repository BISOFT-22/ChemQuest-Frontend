import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHistory } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LiveChangeService {

    public live = new BehaviorSubject<number>(5);
   
    setLive(livetemp: number) {
        this.live.next(livetemp);
        return this.live.asObservable();
    }

    

}