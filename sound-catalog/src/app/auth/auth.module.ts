import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



//AppModules
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';

//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailConfirmedComponent } from './verifyemail-confirmed/verifyemail-confirmed.component';
import { VerifyEmailSentComponent } from './verifyemail-sent/verifyemail-sent.component';
import { VerifyEmailLinkGenerated } from './verifyemail-linkgenerated/verifyemail-linkgenerated.component';
import { ResetPasswordLinkGeneratedComponent } from './resetpassword-linkgenerated/resetpassword-linkgenerated.component';
import { ResetPasswordEmailSentComponent } from './resetpassword-emailsent/resetpassword-emailsent.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { ResetPasswordConfirmedComponent } from './resetpassword-confirmed/resetpassword-confirmed.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, VerifyEmailConfirmedComponent, VerifyEmailSentComponent, VerifyEmailLinkGenerated, ResetPasswordLinkGeneratedComponent, ResetPasswordEmailSentComponent, ResetPasswordComponent, ResetPasswordConfirmedComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, ReactiveFormsModule]
})
export class AuthModule { }
