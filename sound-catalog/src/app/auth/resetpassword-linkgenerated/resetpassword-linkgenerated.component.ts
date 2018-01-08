import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { patternValidator } from '../../shared/validators/pattern.validator';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-pwdrecovery',
  templateUrl: './resetpassword-linkgenerated.component.html',
  styleUrls: ['./resetpassword-linkgenerated.component.css']
})
export class ResetPasswordLinkGeneratedComponent implements OnInit {
  private model: any = {};
  private loading: boolean;
  private error: string;
  private pwdRecoveryForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    //Form groups
    this.pwdRecoveryForm = new FormGroup({
      'email': new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      })
    });
  }

  pwdRecovery() {
    this.authService.sendEmailPwdRecovery(this.pwdRecoveryForm.value.email)
      .then(res => { this.router.navigate(['/resetpassword-showemailsent']); })
      .catch((err: string) => {
        this.error = err;
        this.loading = false;
      });
  }

}
