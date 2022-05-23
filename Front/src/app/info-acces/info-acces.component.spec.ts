import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAccesComponent } from './info-acces.component';

describe('InfoAccesComponent', () => {
  let component: InfoAccesComponent;
  let fixture: ComponentFixture<InfoAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
