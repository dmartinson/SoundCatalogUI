import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';

// Redux
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../state/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private searchForm: FormGroup;
  private firstname: string;
  private lastname: string;
  private username: string;
  private role: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private authService: AuthService) { }

  ngOnInit() {
    // Form groups
    this.searchForm = new FormGroup({
      'search': new FormControl('', {
        updateOn: 'blur'
      })
    });

    if (this.authService.isAuthenticated()) {
      const user = this.ngRedux.getState().user;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.username = user.username;
      this.role = user.role;
    }
   }
}
