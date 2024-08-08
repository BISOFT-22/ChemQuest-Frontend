import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  fromEvent,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private unsubscriber: Subject<any> = new Subject();
  private pageTitle = new BehaviorSubject<string>('');

  public title = this.pageTitle.asObservable();
  public sidebarOpen: boolean = true;

  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  public sidebarOpenO$ = this.sidebarOpenSubject.asObservable();

  constructor() {
    // fromEvent(window, 'resize')
    //   .pipe(debounceTime(100), takeUntil(this.unsubscriber))
    //   .subscribe((event: any) => {
    //     this.sidebarOpen = event.target.innerWidth >= 991;
    //   });
  }

  public setTitle(title: string) {
    this.pageTitle.next(title);
  }

  ngOnDestroy(): void {
    this.unsubscriber.complete();
  }

  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;

    //para el modal o cualquier otro componente que necesite saber si el sidebar esta abierto o cerrado
    const currentState = this.sidebarOpenSubject.value;
    this.sidebarOpenSubject.next(!currentState);
  }
}
