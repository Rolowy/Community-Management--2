import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsEditComponent } from './apartments-edit.component';

describe('ApartmentsEditComponent', () => {
  let component: ApartmentsEditComponent;
  let fixture: ComponentFixture<ApartmentsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
