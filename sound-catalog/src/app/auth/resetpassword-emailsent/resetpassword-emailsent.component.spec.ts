import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailSentComponent } from './resetpassword-emailsent.component';

describe('ResetPasswordEmailSentComponent', () => {
  let component: ResetPasswordEmailSentComponent;
  let fixture: ComponentFixture<ResetPasswordEmailSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordEmailSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
