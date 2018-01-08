import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailSentComponent } from './verifyemail-sent.component';

describe('SendconfirmemailComponent', () => {
  let component: VerifyEmailSentComponent;
  let fixture: ComponentFixture<VerifyEmailSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
