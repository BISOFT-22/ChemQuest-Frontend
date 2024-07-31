/**
*@Author Alejandro José Salazar Lobo
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementListComponent } from './element-list.component';
import { ElementService } from '../../../services/element.service';
import { CommonModule } from '@angular/common';
import { IElement } from '../../../interfaces';
import { By } from '@angular/platform-browser';

describe('ElementListComponent', () => {
  let component: ElementListComponent;
  let fixture: ComponentFixture<ElementListComponent>;
  let elementServiceMock: any;

  beforeEach(async () => {
    elementServiceMock = {
      elements$: jasmine.createSpy('elements$').and.returnValue([]),
      getAllSignal: jasmine.createSpy('getAllSignal')
    };

    await TestBed.configureTestingModule({
      imports: [ElementListComponent, CommonModule],
      providers: [
        { provide: ElementService, useValue: elementServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllSignal (get elementsList from backend) on ngOnInit', () => {
    component.ngOnInit();
    expect(elementServiceMock.getAllSignal).toHaveBeenCalled();
  });

  it('should show element info on click', () => {
    component.showElementInfo(1);
    expect(component.clickElementIndex).toBe(1);
  });

  it('should hide element info on double click', () => {
    //componente de ejemplo 
    component.elementsList = [{ name: 'Hidrógeno', symbol: 'H', atomicNumber: 1 }];
   //para que detecte los cambios y saber que el elemento ya esta cargado y existe
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.element'));
    expect(element).toBeTruthy();
  
    // crea doble clic
    const event = new MouseEvent('dblclick');
    spyOn(event, 'stopPropagation');
    element.nativeElement.dispatchEvent(event);

    // comprueba de que stopPropagation fue llamado
    expect(event.stopPropagation).toHaveBeenCalled();
    
    // verifica que este null par q cierre el modal
    expect(component.clickElementIndex).toBeNull();
  });

  it('should hide element info on event stop propagation', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    component.hideElementInfo(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.clickElementIndex).toBeNull();
  });

  it('should normalize strings correctly', () => {
    const str = 'Élément';
    const normalized = component.normalizeString(str);
    expect(normalized).toBe('element');
  });

  it('should prevent default on drop', () => {
    const event = new DragEvent('drop', { cancelable: true });
    spyOn(event, 'preventDefault');
    component.preventDrop(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow drop and prevent default', () => {
    const event = new DragEvent('dragover', { cancelable: true });
    spyOn(event, 'preventDefault');
    component.allowDrop(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should set data on drag start', () => {
    const element: IElement = { name: 'Hidrógeno', symbol: 'H', atomicNumber: 1 };
    const event = new DragEvent('dragstart');
    Object.defineProperty(event, 'dataTransfer', {
      value: {
        setData: jasmine.createSpy('setData')
      },
      writable: true
    });
    component.onDragStart(event, element);
    expect(event.dataTransfer!.setData).toHaveBeenCalledWith('text/plain', JSON.stringify(element));
  });

  it('should handle drop event with data transfer', () => {
    const elementData = { name: 'Hidrógeno', symbol: 'H', atomicNumber: 1 };
    const event = new DragEvent('drop', { cancelable: true });
    Object.defineProperty(event, 'dataTransfer', {
      value: {
        getData: jasmine.createSpy('getData').and.returnValue(JSON.stringify(elementData))
      },
      writable: true
    });
    spyOn(event, 'preventDefault');
    spyOn(console, 'log');
    component.onDrop(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer!.getData).toHaveBeenCalledWith('text/plain');
    expect(console.log).toHaveBeenCalledWith('Elemento soltado:', elementData);
  });

  it('should handle drop event without data transfer', () => {
    const event = new DragEvent('drop', { cancelable: true });
    Object.defineProperty(event, 'dataTransfer', {
      value: {
        getData: jasmine.createSpy('getData').and.returnValue('')
      },
      writable: true
    });
    spyOn(event, 'preventDefault');
    spyOn(console, 'log');
    component.onDrop(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.dataTransfer!.getData).toHaveBeenCalledWith('text/plain');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should display elements matching the search input', () => {
    const inputElement = fixture.debugElement.query(By.css('#element-search')).nativeElement;
    inputElement.value = 'H';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.isSearching).toBeTrue();
  });

  it('should show no results when search does not match any element', () => {
    const inputElement = fixture.debugElement.query(By.css('#element-search')).nativeElement;
    inputElement.value = 'Unknown';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.noResults).toBeTrue();
  });

});
