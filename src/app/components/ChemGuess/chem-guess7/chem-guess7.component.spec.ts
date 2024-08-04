import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemGuess7Component } from './chem-guess7.component';
import { LifeChangeService } from '../../../services/lifeChange.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChemGuessHangManComponent } from './chem-guess-hang-man/chem-guess-hang-man.component';
import { ModalPruebasComponent } from '../../../modal-pruebas/modal-pruebas.component';
import { ChemGuessHistoryComponent } from './chem-guess-history/chem-guess-history.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ChemGuess7Component', () => {
  let component: ChemGuess7Component;
  let fixture: ComponentFixture<ChemGuess7Component>;
  let liveChangeService: LifeChangeService;

  beforeEach(async () => {
    liveChangeService = new LifeChangeService();

    await TestBed.configureTestingModule({

      imports: [
        ChemGuess7Component,
      ],
      providers: [HttpHandler, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemGuess7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize live image to live100.png', () => {
  //   expect(component.liveImg).toBe('assets/img/live/live100.png');
  // });

  // it('should update live image based on live value', () => {
  //   liveChangeService.live.next(3);
  //   component.ngOnChanges({ live: { currentValue: 3, previousValue: 5, firstChange: false, isFirstChange: () => false } });
  //   expect(component.liveImg).toBe('assets/img/live/live50.png');
  // });

  // it('should call showHistory method', () => {
  //   const modalSpy = spyOn(component, 'showHistory');
  //   component.showHistory({});
  //   expect(modalSpy).toHaveBeenCalled();
  // });
});
