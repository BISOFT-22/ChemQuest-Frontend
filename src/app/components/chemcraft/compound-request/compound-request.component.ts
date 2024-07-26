import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoundService } from '../../../services/compound.service';
import { ICompound } from '../../../interfaces';

@Component({
  selector: 'app-compound-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-request.component.html',
  styleUrls: ['./compound-request.component.scss']
})
export class CompoundRequestComponent implements OnInit {
  public compoundsList: ICompound[] = []
  public difficultyLevel: string = '';
  private service = inject(CompoundService);
  public compound: ICompound = {};
  public text: string = '';
  public textList: string[] = [
    'Debes de crear el compuesto "' + this.compound.name + '" ¿Que elementos necesitas?',
    'Recuerdas la fórmula quimíca del compuesto"' + this.compound.name + '" Genial, ¿De que elementos esta compuesta la fórmula?',
    'Así que eres un químico profesional.. Genial! que elementos componen la fórmula del siguiente compuesto?: "' + this.compound.name  ,
  ];

  constructor() {
    this.service.getAll();
    effect(() => {      
      this.compoundsList = this.service.compounds$();
    });
  }

  ngOnInit(): void {
   this.setDifficultyLevel();
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
}