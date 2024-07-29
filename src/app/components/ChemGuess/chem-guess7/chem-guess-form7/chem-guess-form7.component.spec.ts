import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemGuessForm7Component } from './chem-guess-form7.component';

describe('ChemGuessForm7Component', () => {
    let component: ChemGuessForm7Component;
    let fixture: ComponentFixture<ChemGuessForm7Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChemGuessForm7Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChemGuessForm7Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});