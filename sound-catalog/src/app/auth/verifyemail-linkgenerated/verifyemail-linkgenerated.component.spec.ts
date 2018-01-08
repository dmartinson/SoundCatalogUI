import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailLinkGenerated } from './verifyemail-linkgenerated.component';

describe('VerifyEmailLinkGenerated', () => {
  let component: VerifyEmailLinkGenerated;
  let fixture: ComponentFixture<VerifyEmailLinkGenerated>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailLinkGenerated ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailLinkGenerated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
