import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//validators
import { patternValidator } from '../../shared/validators/pattern.validator';
import { fieldsMatchValidator } from '../../shared/validators/fieldsMatch.validator';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  error: string;
  loading: boolean;
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    //Form groups
    this.resetPasswordForm = this.fb.group({
      'passwords': this.fb.group({
        'password': ['', Validators.required],
        'confirmPassword': ['', Validators.required],
      }, { validator: fieldsMatchValidator('password', 'confirmPassword') }),
    });
  }

  resetPassword() {
    this.activatedRoute.queryParams.subscribe(params => {

      this.loading = true;

      let userId = params['userId'];
      let code = params['code'];

      //problem with match validation if the password field is bound
      let pwd = this.resetPasswordForm.value.passwords.password;

      this.authService.resetPassword(userId, code, pwd)
        .then(res => { this.router.navigate(['/resetpassword-confirmed']); })
        .catch((err: string) => {
          this.error = err;
          this.loading = false;
        });

    });
    
  }

}
