import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChemTestService } from '../../services/chem-test.service';
import { IChemTest } from '../../interfaces';

@Component({
  selector: 'app-chem-test-create',
  templateUrl: './testCreation.component.html',
  styleUrls: ['./testCreation.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ChemTestCreateComponent {
  chemTestForm: FormGroup;

  constructor(private fb: FormBuilder, private chemTestService: ChemTestService) {
    this.chemTestForm = this.fb.group({
      module: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.chemTestForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      type: ['single-choice', Validators.required],
      questionText: ['', Validators.required],
      options: this.fb.array([]),
      correctAnswer: [null, Validators.required]
    });
    this.questions.push(questionGroup);
  }
  
  
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex)?.get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    const optionGroup = this.fb.group({
      text: ['', Validators.required]
    });
    this.getOptions(questionIndex)?.push(optionGroup);
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex)?.removeAt(optionIndex);
  }

  getCorrectAnswerControl(questionIndex: number): FormControl {
    return this.questions.at(questionIndex).get('correctAnswer') as FormControl;
}


  onTypeChange(event: any, questionIndex: number) {
    const type = event.target.value;
    const optionsControl = this.getOptions(questionIndex);
    const correctAnswerControl = this.questions
      .at(questionIndex)
      .get('correctAnswer') as FormControl;

    if (type === 'single-choice') {
      correctAnswerControl?.setValidators(Validators.required);
      correctAnswerControl?.updateValueAndValidity();
      while (optionsControl.length < 4) {
        this.addOption(questionIndex);
      }
    } else if (type === 'matching') {
      correctAnswerControl?.setValidators(Validators.required);
      correctAnswerControl?.updateValueAndValidity();
      while (optionsControl.length > 0) {
        optionsControl.clear();
      }
    } else if (type === 'short-answer') {
      correctAnswerControl?.setValidators(Validators.required);
      correctAnswerControl?.updateValueAndValidity();
      while (optionsControl.length > 0) {
        optionsControl.clear();
      }
    } else {
      correctAnswerControl?.clearValidators();
      correctAnswerControl?.updateValueAndValidity();
      while (optionsControl.length > 0) {
        optionsControl.clear();
      }
    }
  }

  onSubmit() {
    if (this.chemTestForm.valid) {
      const newChemTest: IChemTest = this.chemTestForm.value;
      this.chemTestService.saveChemTestSignal(newChemTest).subscribe({
        next: () => {
          console.log('ChemTest created successfully');
        },
        error: (error) => {
          console.error('Error creating ChemTest', error);
        }
      });
    }
  }
}