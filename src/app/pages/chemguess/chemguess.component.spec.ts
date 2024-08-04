import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemguessComponent } from './chemguess.component';

describe('ChemguessComponent', () => {
  let component: ChemguessComponent;
  let fixture: ComponentFixture<ChemguessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemguessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChemguessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
