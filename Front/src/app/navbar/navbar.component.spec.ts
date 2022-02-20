import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPacientComponent } from './navbar.component';

describe('NavbarPacientComponent', () => {
  let component: NavbarPacientComponent;
  let fixture: ComponentFixture<NavbarPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
