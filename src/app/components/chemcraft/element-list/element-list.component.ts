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
  elementsList: IElement[] = [];
  noResults: boolean = false;
  // hasResults: boolean = false; //no sirvio 
  isSearching: boolean = false; 

  private service = inject(ElementService);

  // Esto para mostrar la lista en el orden correcto 
  private readonly elementListEffect = effect(() => {
    this.elementsList = [...this.service.elements$()].reverse();
  });

  ngOnInit(): void {
    this.service.getAllSignal();
    this.elementSearch();
  }


  //........................Filtrado o busqueda de elementos............................//

  // Esta funcion es para evitar problemas al buscar elementos con elnombre con tildes, o mayusculas:
  normalizeString(str: string): string {   
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // busqueda de elementos:
  private elementSearch(): void {
    const elementSearch = document.getElementById('element-search') as HTMLInputElement;
    elementSearch.addEventListener('input', () => {
      const filter = this.normalizeString(elementSearch.value);
      this.isSearching = filter.length > 0; // Actualizar isSearching basado en el texto de entrada
      const elementsList = document.querySelector('.elements-list ul') as HTMLElement;
      const elements = elementsList.querySelectorAll<HTMLElement>('.element');

      let hasResults = false; //la defino aqui pq si no me da problemas y intente mucho rato y no entiendo porque no funciona.

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

      this.noResults = this.isSearching && !hasResults; // Actualiza noResults para que muestre el li de que no coincide el elemento
    });
  }



  //........................funciones para el drag & drop............................//

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
