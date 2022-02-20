import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassChangeDoctorComponent } from './pass-change-doctor.component';

describe('PassChangeDoctorComponent', () => {
  let component: PassChangeDoctorComponent;
  let fixture: ComponentFixture<PassChangeDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassChangeDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassChangeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
