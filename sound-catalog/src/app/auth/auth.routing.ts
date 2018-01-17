import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailConfirmedComponent } from './verifyemail-confirmed/verifyemail-confirmed.component';
import { VerifyEmailSentComponent } from './verifyemail-sent/verifyemail-sent.component';
import { VerifyEmailLinkGeneratedComponent } from './verifyemail-linkgenerated/verifyemail-linkgenerated.component';
import { ResetPasswordLinkGeneratedComponent } from './resetpassword-linkgenerated/resetpassword-linkgenerated.component';
import { ResetPasswordEmailSentComponent } from './resetpassword-emailsent/resetpassword-emailsent.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { ResetPasswordConfirmedComponent } from './resetpassword-confirmed/resetpassword-confirmed.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyemail', component: VerifyEmailConfirmedComponent },
  { path: 'verifyemail-showemailsent', component: VerifyEmailSentComponent },
  { path: 'verifyemail-generatelink/:email', component: VerifyEmailLinkGeneratedComponent },
  { path: 'resetpassword-generatelink', component: ResetPasswordLinkGeneratedComponent },
  { path: 'resetpassword-showemailsent', component: ResetPasswordEmailSentComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'resetpassword-confirmed', component: ResetPasswordConfirmedComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

export const routedComponents = [LoginComponent, RegisterComponent];
