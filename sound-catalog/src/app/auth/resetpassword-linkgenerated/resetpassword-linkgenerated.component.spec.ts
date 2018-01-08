import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordLinkGeneratedComponent } from './resetpassword-linkgenerated.component';

describe('ResetPasswordLinkGeneratedComponent', () => {
  let component: ResetPasswordLinkGeneratedComponent;
  let fixture: ComponentFixture<ResetPasswordLinkGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordLinkGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordLinkGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
