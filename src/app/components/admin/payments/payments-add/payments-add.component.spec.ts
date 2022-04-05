import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsAddComponent } from './payments-add.component';

describe('PaymentsAddComponent', () => {
  let component: PaymentsAddComponent;
  let fixture: ComponentFixture<PaymentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
