import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramariPacientComponent } from './programari-pacient.component';

describe('ProgramariPacientComponent', () => {
  let component: ProgramariPacientComponent;
  let fixture: ComponentFixture<ProgramariPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramariPacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramariPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
