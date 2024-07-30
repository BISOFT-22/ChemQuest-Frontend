import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemGuess7Component } from './chem-guess7.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ChemGuess7Component', () => {
  let component: ChemGuess7Component;
  let fixture: ComponentFixture<ChemGuess7Component>;

  beforeEach(async () => {

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
