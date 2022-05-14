import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreatmentPacientComponent } from './add-treatment-pacient.component';

describe('AddTreatmentPacientComponent', () => {
  let component: AddTreatmentPacientComponent;
  let fixture: ComponentFixture<AddTreatmentPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTreatmentPacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreatmentPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
