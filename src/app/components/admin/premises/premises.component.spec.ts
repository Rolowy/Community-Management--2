import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesComponent } from './premises.component';

describe('PremisesComponent', () => {
  let component: PremisesComponent;
  let fixture: ComponentFixture<PremisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
