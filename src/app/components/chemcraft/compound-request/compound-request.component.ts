import { Component, effect, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICompound } from '../../../interfaces';

@Component({
  selector: 'app-compound-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-request.component.html',
  styleUrls: ['./compound-request.component.scss']
})
export class CompoundRequestComponent implements OnInit, OnChanges {
  @Input() compoundsList: ICompound[] = []
  public difficultyLevel: string = '';
  public compound: ICompound = {};
  public compoundName: string = '';
  public compoundFormula: string = '';
  public lastCompound: string = '';
  @Output() compoundGenerated = new EventEmitter<string>();
  public text: string = '';
  public textList: string[] = [];


  ngOnInit(): void {

  }

 //Cada que haya un cambio en la lista de compuestos, se genera una solicitud de compuesto
 //Y como el unico cambio que se genera es el recibir la lista de compuestos generada en chemcraft
 //y se actualiza la de compound-request, entonces es el unico cambio y genera la solicitud de compouesto
 //con el Oninit no funciono porque la lista de compuestos estaria vacia

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compoundsList'] && changes['compoundsList'].currentValue.length > 0) {
      this.generateCompoundRequest();
    }
  }


  getRamdonCompound(): void {
    if (this.compoundsList.length === 0) {
      throw new Error('Compound list is empty');
    }
    const randomIndex = Math.floor(Math.random() * this.compoundsList.length);
    this.compound = this.compoundsList[randomIndex];
  }

  getRandomText(): string {
    const randomIndex = Math.floor(Math.random() * this.textList.length);
    return this.textList[randomIndex];
  }


  setDifficultyLevel(): void {
    const formula = this.compound.formula || '';
    const elementSymbolPar = /[A-Z][a-z]?/g; // esto funciona de manera que primero seleciona una letra mayuscula y luego una minuscula para elementos como el Al o el Fe, Mg, etc..
    const elements = formula.match(elementSymbolPar) || []; //aca revisa que la formula tenga elementos y si no los tiene, devuelve un array vacio
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


  generateCompoundRequest(): void {
    let isSameCompound = true;
    try {
    while (isSameCompound) {
      this.getRamdonCompound();
      console.log(this.compound);
      if (this.compound.name !== this.lastCompound) {
        isSameCompound = false;
      }
    }
    console.log(this.compound.name);
    this.compoundName = this.compound.name!;
    this.compoundFormula = this.compound.formula!;
    this.compoundGenerated.emit(this.compoundFormula);
    this.textList = [
     'Debes de crear el compuesto "' + this.compoundName + '" ¿Que elementos necesitas?',
    'Recuerdas la fórmula quimíca del compuesto "' + this.compoundName + '" Genial, ¿De que elementos esta compuesta la fórmula?',
    'Así que eres un químico profesional.. Genial! ¿Que elementos componen la fórmula del siguiente compuesto?: "' + this.compoundName + '".',
    ];
    this.text = this.getRandomText();
    this.setDifficultyLevel();
    console.log(this.difficultyLevel);
    this.lastCompound = this.compound.name!;
  } catch (error) {
    console.error((error as Error).message);
  }
  }
}
