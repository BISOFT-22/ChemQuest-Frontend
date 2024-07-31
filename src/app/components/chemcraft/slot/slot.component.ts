import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IElement } from '../../../interfaces';

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnChanges {
  @Input() element: { symbol: string; count: number } | null = null;
  @Output() error = new EventEmitter<{ title: string, text: string, buttons: boolean }>();
  @Input() cleanSlot: boolean = false;

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const draggedElement: IElement = JSON.parse(data);
      if (this.element) {
        if (this.element.symbol === draggedElement.symbol) {
          this.element.count += 1; 
        } else {
          // console.log('No se pueden mezclar elementos diferentes en una misma casilla');
          this.error.emit({ title: 'Alto ahí!!', text: 'No se pueden mezclar elementos diferentes en una misma casilla.', buttons: false});
        }
      } else {
        this.element = {
          symbol: draggedElement.symbol || '', 
          count: 1
        };
      }
    }
  }

  onDragStart(event: DragEvent): void {
    if (this.element && this.element.count > 0) {
      event.dataTransfer?.setData('text/plain', JSON.stringify({ symbol: this.element.symbol })); 
      this.element.count -= 1;
      if (this.element.count === 0) {
        setTimeout(() => {
          this.element = null;
        }, 200);
      }
    }
  }

  clearSlotContent() {
    this.element = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['cleanSlot'] ){
      // console.log('cleanSlot:', this.cleanSlot);
    if (this.cleanSlot) {
      this.clearSlotContent();
    }
    }
  }

}
