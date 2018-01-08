import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { patternValidator } from '../../shared/validators/pattern.validator';
import { AuthService } from '../../shared/services/auth.service';
import { AuthData } from '../../shared/models/authData';
import { ErrorAuth } from '../../shared/models/errorAuth';
import { ErrorAuthType } from '../../shared/models/errorAuthType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: any = {};
  private loading: boolean;
  private showLinkConfirmEmail: boolean;
  private error: string;
  private returnUrl: string;
  private loginForm: FormGroup;
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    this.loading = false;
    this.showLinkConfirmEmail = false;
    this.error = '';
    this.returnUrl = '';
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //Form groups
    this.loginForm = new FormGroup({
      'email': new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      }),
      'password': new FormControl('', {
        updateOn: 'blur',
        validators: Validators.required
      })
    });
  }
  
  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        //this.authData = res;
        // login successful so redirect to return url
        if (this.returnUrl === "/") {
          this.router.navigate(['home']);
        }
        else {
          this.router.navigateByUrl(this.returnUrl);
        }
      })
      .catch((error : ErrorAuth)  => {
        this.loading = false;
        this.error = error.Message;

        if (error.Type === ErrorAuthType.EmailNotConfirm) {
          this.showLinkConfirmEmail = true;
        }
      });
  }
}

