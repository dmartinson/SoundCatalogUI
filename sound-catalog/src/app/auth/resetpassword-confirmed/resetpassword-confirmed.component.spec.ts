import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmedComponent } from './resetpassword-confirmed.component';

describe('ResetPasswordConfirmedComponent', () => {
  let component: ResetPasswordConfirmedComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
