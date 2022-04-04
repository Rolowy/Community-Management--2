import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRaportsComponent } from './user-raports.component';

describe('UserRaportsComponent', () => {
  let component: UserRaportsComponent;
  let fixture: ComponentFixture<UserRaportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRaportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRaportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
