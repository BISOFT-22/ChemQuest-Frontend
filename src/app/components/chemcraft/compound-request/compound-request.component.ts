/**
*@Author Alejandro José Salazar Lobo
*/



import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICompound } from '../../../interfaces';

@Component({
  selector: 'app-compound-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-request.component.html',
  styleUrls: ['./compound-request.component.scss'],
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class CompoundRequestComponent implements OnInit, OnChanges {
  @Input() compoundsList: ICompound[] = []
  @Output() compoundGenerated = new EventEmitter<string>();
  @Output() alert = new EventEmitter<{ title: string, text: string, isAlert: boolean, buttons: boolean }>();
  @Input() change: Boolean = false;
  public compound: ICompound = {};
  public lastCompound: string = '';
  public difficultyLevel: string = '';
  public text: string = '';
  public textList: string[] = [];


  ngOnInit(): void {

  }

 //Cada que haya un cambio en la lista de compuestos, se genera una solicitud de compuesto
 //Y como el unico cambio que se genera es el recibir la lista de compuestos generada en chemcraft
 //y se actualiza la de compound-request, entonces es el unico cambio y genera la solicitud de compouesto.
 //con el Oninit no funciono porque la lista de compuestos estaria vacia al iniciar

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compoundsList'] && changes['compoundsList'].currentValue.length > 0) {
      this.generateCompoundRequest();
    }

   
    if(changes['change'] ){
    // console.log(this.change);
    if (this.change) {
      this.generateCompoundRequest();
    }
    // this.change = false; lo pase a chemcraft porque sino, no se detecta como un cambio supongo q por ser un input
    }
  }

  //genera un componente ramdon de la lista
  getRamdonCompound(): void {
    if (this.compoundsList.length === 0) {
      throw new Error('Compound list is empty');
    }
    const randomIndex = Math.floor(Math.random() * this.compoundsList.length);
    this.compound = this.compoundsList[randomIndex];
  }

  //Obtiene un texto aleatorio de la lista de textos
  getRandomText(): string {
    const randomIndex = Math.floor(Math.random() * this.textList.length);
    return this.textList[randomIndex];
  }

//Determina el nivel de dificultad de la solicitud de compuesto
  setDifficultyLevel(): void {
    const elementSymbolPar = /[A-Z][a-z]?/g; // esto funciona de manera que primero seleciona una letra mayuscula y luego una minuscula para elementos como el Al o el Fe, Mg, etc..
    const elements = this.compound.formula || ''.match(elementSymbolPar) || []; //aca revisa que la formula tenga elementos y si no los tiene, devuelve un array vacio
    const uniqueElements = new Set(elements);
    const elementCount = uniqueElements.size;

    if (elementCount <= 2) {
      this.difficultyLevel = 'Fácil';
    } else if (elementCount === 3) {
      this.difficultyLevel = 'Media';
    } else {
      this.difficultyLevel = 'Difícil';
    }
}

//Genera la solicitud de compuesto aleatorio, si se repite el compuesto con el anterior genera otro.
  generateCompoundRequest(): void {
    let isSameCompound = true;
    try {
    while (isSameCompound) {
      this.getRamdonCompound();
      // console.log(this.compound);
      if (this.compound.name !== this.lastCompound) {
        isSameCompound = false;
      }
    }

    if (!this.compound) {
      throw new Error("Compound is empty.");
    }
    // console.log(this.compound.name);
    if (!this.compound.name || !this.compound.formula) {
      throw new Error("Compound.name or compound.formula is empty.");
    }
    this.compoundGenerated.emit(this.compound.formula);
    this.textList = [
      'Debes crear el compuesto <span class="compound-name">"' + this.compound.name + '"</span>. ¿Qué elementos son necesarios para ello?',
      '¿Recuerdas la fórmula química del compuesto <span class="compound-name">"' + this.compound.name + '"</span>? Genial, ¿De qué elementos está compuesta la fórmula?',
      'Así que eres un químico profesional... ¡Genial! ¿Qué elementos componen la fórmula del siguiente compuesto: <span class="compound-name">"' + this.compound.name + '"</span>?',
    ];
    this.text = this.getRandomText();
    this.setDifficultyLevel();
    // console.log(this.difficultyLevel);
    this.lastCompound = this.compound.name;
    this.change = false;
    // console.log(this.change);
  } catch (error) {
    console.error((error as Error).message);
  }
  }

//Muestra una alerta para cambiar la solicitud de compuesto
  onButtonClick(): void {
    this.alert.emit({
      title: 'Cambio de solicitud',
      text: 'Deseas cambiar la solicitud del compuesto a crear? si lo deseas cambiar perderás puntos.',
      isAlert: true,
      buttons: true
    });
  }
}
