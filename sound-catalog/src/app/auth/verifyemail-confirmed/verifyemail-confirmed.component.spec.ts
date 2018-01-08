import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailConfirmedComponent } from './verifyemail-confirmed.component';

describe('VerifyemailComponent', () => {
  let component: VerifyEmailConfirmedComponent;
  let fixture: ComponentFixture<VerifyEmailConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
