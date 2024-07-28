import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerComponent);
    
    component = fixture.componentInstance;
    
    h1 = fixture.nativeElement.querySelector('h1');
    
    fixture.detectChanges(); // trigger initial data binding

  });

  it('should create', () => {
    expect(component);
  });

    
  it('should display the title in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Test Tour of Heroes');
    
  });
});
