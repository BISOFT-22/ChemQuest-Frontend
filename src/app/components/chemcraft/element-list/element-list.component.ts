import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementService } from '../../../services/element.service';
import { IElement } from '../../../interfaces';
import { effect } from '@angular/core';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss']
})
export class ElementListComponent implements OnInit {
  public elementsList: IElement[] = [];
  public noResults: boolean = false;
  public isSearching: boolean = false;
  public clickElementIndex: number | null = null; 
  private service = inject(ElementService);


  constructor() {
    this.service.getAllSignal();
    effect(() => {      
      this.elementsList = [...this.service.elements$()].reverse();
    });
  }

  ngOnInit(): void {
    this.service.getAllSignal();
    this.elementSearch();
  }


  showElementInfo(index: number): void {
    this.clickElementIndex = index;
  }

  hideElementInfo(event: MouseEvent): void {
    event.stopPropagation();
    this.clickElementIndex = null;
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  private elementSearch(): void {
    const elementSearch = document.getElementById('element-search') as HTMLInputElement;
    elementSearch.addEventListener('input', () => {
      const filter = this.normalizeString(elementSearch.value);
      this.isSearching = filter.length > 0;
      const elementsList = document.querySelector('.elements-list ul') as HTMLElement;
      const elements = elementsList.querySelectorAll<HTMLElement>('.element');

      let hasResults = false;

      elements.forEach((element) => {
        const symbol = element.getAttribute('data-symbol') || '';
        const name = element.getAttribute('data-name') || '';
        const atomicNumber = element.getAttribute('data-atomic-number') || '';

        if (
          this.normalizeString(symbol).includes(filter) ||
          this.normalizeString(name).includes(filter) ||
          this.normalizeString(atomicNumber).includes(filter)
        ) {
          element.style.display = 'flex';
          hasResults = true;
        } else {
          element.style.display = 'none';
        }
      });

      this.noResults = this.isSearching && !hasResults;
    });
  }

  preventDrop(event: DragEvent): void {
    event.preventDefault();
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDragStart(event: DragEvent, element: IElement): void {
    event.dataTransfer?.setData('text/plain', JSON.stringify(element));
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const draggedElement: IElement = JSON.parse(data);
      console.log('Elemento soltado:', draggedElement);
    }
  }
}
