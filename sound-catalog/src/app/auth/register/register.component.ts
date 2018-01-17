import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
// validators
import { patternValidator } from '../../shared/validators/pattern.validator';
import { fieldsMatchValidator } from '../../shared/validators/fieldsMatch.validator';
import { EmailNotTakenValidator } from '../../shared/validators/emailNotTaken.validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: User;
  error: string;
  loading: boolean;
  private registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

    this.loading = false;
    this.error = '';
    this.model = new User();
  }

  ngOnInit() {
    // Form groups
    this.registerForm = this.fb.group({
      'firstname': new FormControl('', { validators: Validators.required }),
      'lastname': new FormControl('', { validators: Validators.required }),
      'email': new FormControl('', {
        asyncValidators: EmailNotTakenValidator.bind(this),
        validators: [Validators.required,
          // tslint:disable-next-line:max-line-length
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      }),
      'passwords': this.fb.group({
        'password': ['', Validators.required],
        'confirmPassword': ['', Validators.required],
      }, { validator: fieldsMatchValidator('password', 'confirmPassword') }),
    });
  }

  register() {
    this.loading = true;

    // problem with match validation if the password field is bound
    this.model.password = this.registerForm.value.passwords.password;

    this.authService.register(this.model)
      .then(res => { this.router.navigate(['/verifyemail-showemailsent']); })
      .catch((err: string) => {
        this.error = err;
        this.loading = false;
      });
  }
}
