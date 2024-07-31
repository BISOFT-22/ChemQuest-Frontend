/**
*@Author Guillermo Jiménez De Sárraga
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectComponent } from './language-select.component';

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
