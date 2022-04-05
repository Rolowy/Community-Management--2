import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDeleteComponent } from './payments-delete.component';

describe('PaymentsDeleteComponent', () => {
  let component: PaymentsDeleteComponent;
  let fixture: ComponentFixture<PaymentsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
