import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesEditComponent } from './premises-edit.component';

describe('PremisesEditComponent', () => {
  let component: PremisesEditComponent;
  let fixture: ComponentFixture<PremisesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremisesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
