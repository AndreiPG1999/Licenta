import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPacientComponent } from './stats-pacient.component';

describe('StatsPacientComponent', () => {
  let component: StatsPacientComponent;
  let fixture: ComponentFixture<StatsPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
