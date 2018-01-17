import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private message: string;
  private error: string;
  private testForm: FormGroup;

  constructor(private authService: AuthService) {
    this.message = '';
    this.error = '';
  }

  ngOnInit() {
    this.testForm = new FormGroup({});
  }

  testauth() {
    this.authService.testMethodAuthorized()
      .then(res => {
        this.message = 'user is authorized';
      })
      .catch((err: string) => {
        this.error = err;
      });
  }

}
