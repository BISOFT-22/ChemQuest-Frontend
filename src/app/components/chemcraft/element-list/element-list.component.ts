import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.scss'
})
export class ElementListComponent implements OnInit {
  elements = [
    { id: 'H2', name: 'Hidrógeno' },
    { id: 'O1', name: 'Oxígeno' },
    { id: 'C1', name: 'Carbono' },
    { id: 'Fe1', name: 'Hierro' }
  ];

  constructor() { }

  ngOnInit(): void { }
}