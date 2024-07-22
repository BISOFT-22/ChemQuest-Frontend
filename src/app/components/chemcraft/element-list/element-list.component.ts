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
  private service = inject(ElementService);

  // Esto para mostrar la lista en el orden correcto del primero al ultimo
  private readonly elementListEffect = effect(() => {
    this.elementsList = [...this.service.elements$()].reverse();
  });

  ngOnInit(): void {
    this.service.getAllSignal();
    this.elementSearch();
  }

  private elementSearch(): void {
    const elementSearch = document.getElementById('element-search') as HTMLInputElement;
    elementSearch.addEventListener('input', () => {
      const filter = elementSearch.value.toLowerCase();
      const elementsList = document.querySelector('.elements-list ul') as HTMLElement;
      const elements = elementsList.querySelectorAll<HTMLElement>('.element');

      elements.forEach((element) => {
        const symbol = element.getAttribute('data-symbol') || '';
        const name = element.getAttribute('data-name') || '';
        const atomicNumber = element.getAttribute('data-atomic-number') || '';

        if (symbol.toLowerCase().includes(filter) || name.toLowerCase().includes(filter) || atomicNumber.includes(filter)) {
          element.style.display = 'flex';
        } else {
          element.style.display = 'none';
        }
      });
    });
  }
}
