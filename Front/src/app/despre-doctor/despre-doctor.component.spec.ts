import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespreDoctorComponent } from './despre-doctor.component';

describe('DespreDoctorComponent', () => {
  let component: DespreDoctorComponent;
  let fixture: ComponentFixture<DespreDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespreDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespreDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
