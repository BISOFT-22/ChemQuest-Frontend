import { ElementListComponent } from './element-list.component';
import { ElementService } from '../../../services/element.service';
import { IElement } from '../../../interfaces';
import { of } from 'rxjs';

describe('ElementListComponent', () => {
  let component: ElementListComponent;
  let elementServiceSpy: { getAll: jasmine.Spy };
  let mockElements: IElement[];

  beforeEach(() => {
    mockElements = [
      { id: 1, name: 'Hydrogen', symbol: 'H' },
      { id: 2, name: 'Oxygen', symbol: 'O' }
    ];

    elementServiceSpy = jasmine.createSpyObj('ElementService', ['getAll']);
    elementServiceSpy.getAll.and.returnValue(of(mockElements));

    component = new ElementListComponent();
    component.ngOnInit();  // Trigger the ngOnInit lifecycle hook
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of elements', () => {
    expect(component.elementsList.length).toBe(2);
  });

//   it('should filter elements based on search input', () => {
//     component.elementsList = mockElements;
//     component.filteredElements = mockElements;

//     component.filterElements('O');
//     expect(component.filteredElements.length).toBe(1);
//     expect(component.filteredElements[0].name).toBe('Oxygen');
//   });
});