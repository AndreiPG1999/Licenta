import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticiComponent } from './statistici.component';

describe('StatisticiComponent', () => {
  let component: StatisticiComponent;
  let fixture: ComponentFixture<StatisticiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
