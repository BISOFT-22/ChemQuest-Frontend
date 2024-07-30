import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemGuessHangManComponent } from './chem-guess-hang-man.component';
import { RandomizerService } from '../../../../services/randomizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LiveChangeService } from '../../../../services/liveChange.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChemGuessHangManComponent', () => {
  let component: ChemGuessHangManComponent;
  let fixture: ComponentFixture<ChemGuessHangManComponent>;
  let randomizerServiceStub: Partial<RandomizerService>;
  let liveChangeServiceStub: Partial<LiveChangeService>;

  beforeEach(async () => {
    // Configuración de los stubs de los servicios
    randomizerServiceStub = {
      checkAndFetch: jasmine.createSpy('checkAndFetch'),
      items$: of([]),
      getRandomWord: jasmine.createSpy('getRandomWord').and.returnValue('TEST')
    };

    liveChangeServiceStub = {
      setLive: jasmine.createSpy('setLive')
    };

    await TestBed.configureTestingModule({
      imports: [ ChemGuessHangManComponent ],
      providers: [
        { provide: RandomizerService, useValue: randomizerServiceStub },
        { provide: NgbModal, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: LiveChangeService, useValue: liveChangeServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemGuessHangManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize and fetch data on init', () => {
  //   component.ngOnInit();
  //   expect(randomizerServiceStub.checkAndFetch).toHaveBeenCalled();
  //   expect(randomizerServiceStub.getRandomWord).toHaveBeenCalled();
  //   expect(component.word).toBe('TEST');
  //   expect(component.displayedWord).toEqual(['', '', '', '']);
  // });

  // it('should check and add letter to guessedLetters', () => {
  //   component.letter = 'A';
  //   component.displayedWord = ['', '', '', ''];
  //   component.checkLetter('A');
  //   expect(component.guessedLetters.has('A')).toBeTrue();
  //   expect(component.displayedWord).toEqual(['', '', '', '']);
  // });

  // it('should replace blank with given letter', () => {
  //   component.displayedWord = ['', '', '', ''];
  //   component.replaceBlank(1, 'B');
  //   expect(component.displayedWord).toEqual(['', 'B', '', '_']);
  // });

  // it('should split word into letters', () => {
  //   component.splitIntoWords('WORD');
  //   expect(component.wordsArray).toEqual(['W', 'O', 'R', 'D']);
  // });

  // Agrega más pruebas según sea necesario...
});