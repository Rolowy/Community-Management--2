import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesDeleteComponent } from './premises-delete.component';

describe('PremisesDeleteComponent', () => {
  let component: PremisesDeleteComponent;
  let fixture: ComponentFixture<PremisesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremisesDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremisesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
