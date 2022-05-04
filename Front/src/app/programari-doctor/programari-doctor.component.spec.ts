import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramariDoctorComponent } from './programari-doctor.component';

describe('ProgramariDoctorComponent', () => {
  let component: ProgramariDoctorComponent;
  let fixture: ComponentFixture<ProgramariDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramariDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramariDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
