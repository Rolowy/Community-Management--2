import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoactivationcodeComponent } from './noactivationcode.component';

describe('NoactivationcodeComponent', () => {
  let component: NoactivationcodeComponent;
  let fixture: ComponentFixture<NoactivationcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoactivationcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoactivationcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
