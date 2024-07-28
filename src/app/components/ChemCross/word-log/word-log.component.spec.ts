import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordLogComponent } from './word-log.component';
import { CommonModule, NgFor } from '@angular/common';
import { Dictionary } from 'app/interfaces/language';

describe('WordLogComponent', () => {
  let component: WordLogComponent;
  let fixture: ComponentFixture<WordLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, WordLogComponent, NgFor],
      declarations: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordLogComponent);
    component = fixture.componentInstance;

    // Manually setting inputs to ensure they're defined
    component.dictionary = Dictionary; //0: English 1:Spanish
    component.id_language = 0;
    component.id_message = 0;
    component.wordList = ['uno', 'dos', 'tres'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for @Input properties', () => {
    expect(component.dictionary).toEqual(Dictionary);
    expect(component.id_language).toBe(0);
    expect(component.id_message).toBe(0);
    expect(component.wordList).toEqual(['uno', 'dos', 'tres']);
  });

  it('should display the word list in the template', () => {
    const compiled = fixture.nativeElement;
    const wordItems = compiled.querySelectorAll('.hintWord');
    expect(wordItems.length).toBe(component.wordList.length);
    expect(wordItems[0].textContent).toContain('uno');
    expect(wordItems[1].textContent).toContain('dos');
    expect(wordItems[2].textContent).toContain('tres');
  });


  it('should display the heading in the template', () => {
    const compiled = fixture.nativeElement;
    const heading = compiled.querySelector('h1');
    expect(heading.textContent).toContain('Used words');
  });
});