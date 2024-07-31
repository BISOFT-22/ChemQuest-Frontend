/**
*@Author Alejandro José Salazar Lobo
*/
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('elementsContainer', { static: true }) elementsContainer!: ElementRef;

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

  /**
   *Muestra la información del elemento en el índice especificado.
   *@param index - El índice del elemento que se va a mostrar.
   */
  showElementInfo(index: number): void {
    this.clickElementIndex = index;
  }

  /**
   Oculta la información del elemento.
   *@param event - El evento del mouse que desencadenó la acción.
   */
  hideElementInfo(event: MouseEvent): void {
    event.stopPropagation();
    this.clickElementIndex = null;
  }

  /**
   Normaliza una cadena de texto eliminando los caracteres diacríticos y convirtiéndola a minúsculas.
   *@param str - La cadena de texto a normalizar.
   *@returns La cadena de texto normalizada.
   */
  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  /**
   *Al ingresar texto en el campo de búsqueda, se filtran los elementos que coinciden con el texto ingresado.
   *Los elementos que coinciden se muestran, mientras que los elementos que no coinciden se ocultan.
   *Además, se actualiza la variable `isSearching` para indicar si se está realizando una búsqueda.
   *Si no se encuentran resultados y se está realizando una búsqueda, se actualiza la variable `noResults`.
   */
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

  /**
   *Previene el evento de soltar elementos arrastrados.
   @param event - El evento de arrastre.
   */
  preventDrop(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   *Permite el evento de soltar elementos arrastrados.
   *@param event - El evento de arrastre.
   */
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   *Maneja el evento de inicio de arrastre de un elemento.
   *@param event - El evento de arrastre.
   *@param element - El elemento arrastrado.
   */
  onDragStart(event: DragEvent, element: IElement): void {
    event.dataTransfer?.setData('text/plain', JSON.stringify(element));
  }

  /**
   *Maneja el evento de soltar un elemento arrastrado.
   *@param event - El evento de soltar.
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const draggedElement: IElement = JSON.parse(data);
      console.log('Elemento soltado:', draggedElement);
    }
  }

  
  /**
   * Desplaza el contenedor de elementos hacia la izquierda.
  */
  scrollLeft(): void {
    this.elementsContainer.nativeElement.scrollBy({ left: -100, behavior: 'smooth' });
  }

  
  /**
   * Desplaza el contenedor de elementos hacia la derecha.
  */
  scrollRight(): void {
    this.elementsContainer.nativeElement.scrollBy({ left: 100, behavior: 'smooth' });
  }
}
