import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemGuessSendComponent } from './chem-guess-form7.component';



describe('ChemGuessForm7Component', () => {
    let component: ChemGuessSendComponent;
    let fixture: ComponentFixture<ChemGuessSendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChemGuessSendComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChemGuessSendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});