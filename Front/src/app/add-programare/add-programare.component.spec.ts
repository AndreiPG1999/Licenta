import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramareComponent } from './add-programare.component';

describe('AddProgramareComponent', () => {
  let component: AddProgramareComponent;
  let fixture: ComponentFixture<AddProgramareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
