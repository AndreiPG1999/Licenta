import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiografiiComponent } from './radiografii.component';

describe('RadiografiiComponent', () => {
  let component: RadiografiiComponent;
  let fixture: ComponentFixture<RadiografiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiografiiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiografiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
