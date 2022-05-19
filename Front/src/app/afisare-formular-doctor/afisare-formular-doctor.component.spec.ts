import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfisareFormularDoctorComponent } from './afisare-formular-doctor.component';

describe('AfisareFormularDoctorComponent', () => {
  let component: AfisareFormularDoctorComponent;
  let fixture: ComponentFixture<AfisareFormularDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfisareFormularDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfisareFormularDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
