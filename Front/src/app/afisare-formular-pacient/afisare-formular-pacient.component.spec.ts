import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfisareFormularPacientComponent } from './afisare-formular-pacient.component';

describe('AfisareFormularPacientComponent', () => {
  let component: AfisareFormularPacientComponent;
  let fixture: ComponentFixture<AfisareFormularPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfisareFormularPacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfisareFormularPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
