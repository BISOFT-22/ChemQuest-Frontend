import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementListComponent } from "../../components/chemcraft/element-list/element-list.component";

@Component({
  selector: 'app-chemcraft',
  standalone: true,
  imports: [ElementListComponent],
  templateUrl: './chemcraft.component.html',
  styleUrls: ['./chemcraft.component.scss']
})
export class ChemcraftComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Este método se llama una vez que el componente ha sido inicializado.
  }

  ngAfterViewInit(): void {
    // Este método se llama una vez que la vista del componente ha sido inicializada.
    this.initializeScript();
  }

  private initializeScript(): void {
    document.addEventListener('DOMContentLoaded', (event) => {
      const elements = document.querySelectorAll<HTMLElement>('.element');
      const slots = document.querySelectorAll<HTMLElement>('.slot');
      const resultSlot = document.getElementById('resultado') as HTMLElement;
      const createButton = document.querySelector('.create-button') as HTMLElement;
      const clearButton = document.querySelector('.clear-button') as HTMLElement;
      const modal = document.getElementById('compuesto-modal') as HTMLElement;
      const tutorial = document.getElementById('tutorial-modal') as HTMLElement;
      const infoButton = document.getElementById('info') as HTMLElement;
      const closeModalButton = document.querySelector('.close-modal') as HTMLElement;
      const closeTutorialButton = document.getElementById('close-tutorial') as HTMLElement;

      const combinations: { [key: string]: string } = {
        'H2-O1': 'Agua (H2O)',
        'C1-O2': 'Dióxido de Carbono (CO2)',
        'C1-H4': 'Metano (CH4)',
        'O2-Fe1': 'Óxido de Hierro (Fe2O3)'
      };

      elements.forEach(element => {
        element.addEventListener('dragstart', (e) => {
          e.dataTransfer?.setData('text/plain', (e.target as HTMLElement).id);
          element.classList.add('dragging');
        });

        element.addEventListener('dragend', (e) => {
          element.classList.remove('dragging');
        });
      });

      slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
          e.preventDefault();
        });

        slot.addEventListener('drop', (e) => {
          e.preventDefault();
          const elementId = e.dataTransfer?.getData('text/plain');
          if (elementId) {
            const originalElement = document.getElementById(elementId) as HTMLElement;
            const element = originalElement.cloneNode(true) as HTMLElement;
            element.id = `clone-${Math.random().toString(36).substring(7)}`;

            let counter = slot.querySelector('.counter') as HTMLElement;
            if (!counter) {
              counter = document.createElement('div');
              counter.classList.add('counter');
              counter.innerText = '0';
              slot.appendChild(counter);
            }

            const count = parseInt(counter.innerText, 10) + 1;
            counter.innerText = count.toString();

            element.addEventListener('dragstart', (e) => {
              e.dataTransfer?.setData('text/plain', (e.target as HTMLElement).id);
              element.classList.add('dragging');
            });

            element.addEventListener('dragend', (e) => {
              element.classList.remove('dragging');
            });

            if (!slot.querySelector('.element')) {
              slot.appendChild(element);
            }
            this.checkCombination();
          }
        });

        slot.addEventListener('dragstart', (e) => {
          const element = e.target as HTMLElement;
          if (element.classList.contains('element')) {
            e.dataTransfer?.setData('text/plain', element.id);
            element.classList.add('dragging');
          }
        });

        slot.addEventListener('dragend', (e) => {
          const element = e.target as HTMLElement;
          if (element.classList.contains('element')) {
            element.classList.remove('dragging');
          }
        });
      });

      this.initializeButtons();
    });
  }

  private initializeButtons(): void {
    const resultSlot = document.getElementById('resultado') as HTMLElement;
    const modal = document.getElementById('compuesto-modal') as HTMLElement;
    const tutorial = document.getElementById('tutorial-modal') as HTMLElement;
    const infoButton = document.getElementById('info') as HTMLElement;
    const closeModalButton = document.querySelector('.close-modal') as HTMLElement;
    const closeTutorialButton = document.getElementById('close-tutorial') as HTMLElement;
    const createButton = document.querySelector('.create-button') as HTMLElement;
    const clearButton = document.querySelector('.clear-button') as HTMLElement;

    function showModal() {
      modal.style.display = 'flex';
    }

    function showTutorial() {
      tutorial.style.display = 'flex';
    }

    infoButton.addEventListener('click', () => {
      showTutorial();
    });

    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    closeTutorialButton.addEventListener('click', () => {
      tutorial.style.display = 'none';
    });

    createButton.addEventListener('click', () => {
      this.checkCombination();
    });

    clearButton.addEventListener('click', () => {
      const slots = document.querySelectorAll<HTMLElement>('.slot');
      slots.forEach(slot => {
        slot.innerHTML = '';
        const counter = slot.querySelector('.counter') as HTMLElement;
        if (counter) {
          counter.innerText = '0';
        }
      });

      resultSlot.innerText = '';
      resultSlot.classList.remove('combined');
    });

    const elementSearch = document.getElementById('element-search') as HTMLInputElement;
    elementSearch.addEventListener('input', function() {
      const filter = this.value.toLowerCase();
      const elementsList = document.querySelector('.elements-list ul') as HTMLElement;
      const elements = elementsList.querySelectorAll<HTMLElement>('.element');

      elements.forEach(function(element) {
        if (element.textContent?.toLowerCase().includes(filter)) {
          element.style.display = 'flex';
        } else {
          element.style.display = 'none';
        }
      });
    });
  }

  private checkCombination(): void {
    const resultSlot = document.getElementById('resultado') as HTMLElement;
    const combinations: { [key: string]: string } = {
      'H2-O1': 'Agua (H2O)',
      'C1-O2': 'Dióxido de Carbono (CO2)',
      'C1-H4': 'Metano (CH4)',
      'O2-Fe1': 'Óxido de Hierro (Fe2O3)'
    };

  }
}
