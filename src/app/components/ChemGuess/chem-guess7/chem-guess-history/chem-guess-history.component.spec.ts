import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemGuessHistoryComponent } from './chem-guess-history.component';

describe('ChemGuessHistoryComponent', () => {
    let component: ChemGuessHistoryComponent;
    let fixture: ComponentFixture<ChemGuessHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChemGuessHistoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChemGuessHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});