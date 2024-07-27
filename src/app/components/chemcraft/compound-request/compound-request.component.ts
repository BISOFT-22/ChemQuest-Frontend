import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICompound } from '../../../interfaces';

@Component({
  selector: 'app-compound-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-request.component.html',
  styleUrls: ['./compound-request.component.scss']
})
export class CompoundRequestComponent implements OnInit {
  @Input() compoundsList: ICompound[] = []
  public difficultyLevel: string = '';
  public compound: ICompound = {};
  public compoundName: string = '';
  public lastCompound: string = '';
  public text: string = '';
  public textList: string[] = [];


  ngOnInit(): void {
  }


  getRamdonCompound(): void {
    if (this.compoundsList.length === 0) {
      throw new Error('Compound list is empty');
    }
    const randomIndex = Math.floor(Math.random() * this.compoundsList.length);
    this.compound = this.compoundsList[randomIndex];
    console.log(this.compound);
  }

  getRandomText(): string {
    const randomIndex = Math.floor(Math.random() * this.textList.length);
    return this.textList[randomIndex];
  }


   setDifficultyLevel(): void {
    const uniqueElements = new Set(this.compound.formula?.replace(/[^A-Za-z]/g, '').split(''));
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
    while (isSameCompound) {
      this.getRamdonCompound();
      if (this.compound.name !== this.lastCompound) {
        isSameCompound = false;
      }
    }
    console.log(this.compound.name);
    this.compoundName = this.compound.name!;
    this.textList = [
     'Debes de crear el compuesto "' + this.compoundName + '" ¿Que elementos necesitas?',
    'Recuerdas la fórmula quimíca del compuesto "' + this.compoundName + '" Genial, ¿De que elementos esta compuesta la fórmula?',
    'Así que eres un químico profesional.. Genial! que elementos componen la fórmula del siguiente compuesto?: "' + this.compoundName + '".',
    ];
    this.text = this.getRandomText();
    this.setDifficultyLevel();
    this.lastCompound = this.compound.name!;
  }
}
