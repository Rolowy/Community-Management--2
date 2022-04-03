import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsAddComponent } from './apartments-add.component';

describe('ApartmentsAddComponent', () => {
  let component: ApartmentsAddComponent;
  let fixture: ComponentFixture<ApartmentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
