import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRaportsViewComponent } from './user-raports-view.component';

describe('UserRaportsViewComponent', () => {
  let component: UserRaportsViewComponent;
  let fixture: ComponentFixture<UserRaportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRaportsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRaportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
