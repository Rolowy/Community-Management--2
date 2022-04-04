import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportsDeleteComponent } from './raports-delete.component';

describe('RaportsDeleteComponent', () => {
  let component: RaportsDeleteComponent;
  let fixture: ComponentFixture<RaportsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
