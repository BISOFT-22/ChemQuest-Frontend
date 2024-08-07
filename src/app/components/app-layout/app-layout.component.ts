import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './elements/topbar/topbar.component';
import { SidebarComponent } from './elements/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { BackgroundService } from '../../services/background.service';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    SvgIconComponent
  ],
  templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent implements OnInit{
  public title?: string;
  public backgroundUrl: string = '';
  public sidebarOpen: boolean = true;
  private subscription: Subscription | undefined;
  
  constructor(public layoutService: LayoutService, private backgroundService: BackgroundService,  private router: Router, private cdr: ChangeDetectorRef) {
    this.layoutService.title.subscribe((title) => (this.title = title));
  }

  ngOnInit() {
    this.subscription = this.layoutService.sidebarOpenO$.subscribe(open => {
      this.sidebarOpen = open;
    });
    this.backgroundService.background$.subscribe((url) => {
      this.backgroundUrl = url;
      this.cdr.detectChanges(); // para q detecte cambios
    });

  
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.backgroundService.changeBackground('');
      });
  }
}
