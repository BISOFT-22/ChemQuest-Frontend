/**
*@Author Guillermo Jiménez De Sárraga
*/
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CrossRowComponent } from "./cross-row.component";
import { CrossServiceService } from 'app/services/cross-service.service';
import { Dictionary } from 'app/interfaces/language';

describe("CrossRowComponent", () => {
  let component: CrossRowComponent;
  let fixture: ComponentFixture<CrossRowComponent>;
  let myService: CrossServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossRowComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossRowComponent);
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