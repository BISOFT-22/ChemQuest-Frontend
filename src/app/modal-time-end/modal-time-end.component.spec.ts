import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimeEndComponent } from './modal-time-end.component';

describe('ModalTimeEndComponent', () => {
  let component: ModalTimeEndComponent;
  let fixture: ComponentFixture<ModalTimeEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTimeEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTimeEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
