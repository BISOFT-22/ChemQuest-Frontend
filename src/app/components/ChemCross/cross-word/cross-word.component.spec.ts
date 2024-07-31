/**
*@Author Guillermo Jiménez De Sárraga
*/
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CrossWordComponent } from "./cross-word.component";
import { CrossServiceService } from 'app/services/cross-service.service';

describe("CrossWordComponent", () => {
  let component: CrossWordComponent;
  let fixture: ComponentFixture<CrossWordComponent>;
  let myService: CrossServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossWordComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    myService = TestBed.inject(CrossServiceService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });
  });
})