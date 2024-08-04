import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemquestModalComponent } from './chemquest-modal.component';

describe('ChemquestModalComponent', () => {
  let component: ChemquestModalComponent;
  let fixture: ComponentFixture<ChemquestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemquestModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChemquestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
