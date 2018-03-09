import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// AppModules
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailConfirmedComponent } from './verifyemail-confirmed/verifyemail-confirmed.component';
import { VerifyEmailSentComponent } from './verifyemail-sent/verifyemail-sent.component';
import { VerifyEmailLinkGeneratedComponent } from './verifyemail-linkgenerated/verifyemail-linkgenerated.component';
import { ResetPasswordLinkGeneratedComponent } from './resetpassword-linkgenerated/resetpassword-linkgenerated.component';
import { ResetPasswordEmailSentComponent } from './resetpassword-emailsent/resetpassword-emailsent.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { ResetPasswordConfirmedComponent } from './resetpassword-confirmed/resetpassword-confirmed.component';

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent, VerifyEmailConfirmedComponent],
  declarations: [LoginComponent, RegisterComponent, VerifyEmailConfirmedComponent,
    VerifyEmailSentComponent, VerifyEmailLinkGeneratedComponent, ResetPasswordLinkGeneratedComponent,
    ResetPasswordEmailSentComponent, ResetPasswordComponent, ResetPasswordConfirmedComponent]
})
export class AuthModule { }
