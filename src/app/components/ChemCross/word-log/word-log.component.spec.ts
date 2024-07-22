import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLogComponent } from './word-log.component';

describe('WordLogComponent', () => {
  let component: WordLogComponent;
  let fixture: ComponentFixture<WordLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('description', () => {
    expect(component).toBeDefined();
  })
});
