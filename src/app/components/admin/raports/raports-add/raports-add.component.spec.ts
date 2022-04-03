import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportsAddComponent } from './raports-add.component';

describe('RaportsAddComponent', () => {
  let component: RaportsAddComponent;
  let fixture: ComponentFixture<RaportsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
