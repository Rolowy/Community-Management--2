import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesAddComponent } from './premises-add.component';

describe('PremisesAddComponent', () => {
  let component: PremisesAddComponent;
  let fixture: ComponentFixture<PremisesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremisesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
