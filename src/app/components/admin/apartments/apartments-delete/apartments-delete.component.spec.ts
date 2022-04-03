import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsDeleteComponent } from './apartments-delete.component';

describe('ApartmentsDeleteComponent', () => {
  let component: ApartmentsDeleteComponent;
  let fixture: ComponentFixture<ApartmentsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
