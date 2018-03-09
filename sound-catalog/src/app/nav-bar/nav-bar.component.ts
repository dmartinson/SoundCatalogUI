import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';

// Redux
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../state/store';
import { AuthorizedUser } from '../shared/models/authorizedUser';

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
  private isAuthenticated: boolean;
  private isGuest: boolean;
  private isAdmin: boolean;
  private isContributor: boolean;

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

    this.isAuthenticated = false;

    this.ngRedux.subscribe(() => {
      this.updateNavbar(this.ngRedux.getState().user);
    });
   }

   updateNavbar(user: AuthorizedUser) {
    if (user == null) {
      this.isAuthenticated = false;
    } else {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.username = user.username;
      this.role = user.role;
      this.isAuthenticated = true;
      switch (this.role) {
        case 'Admin':
           this.isAdmin = true;
           break;
        case 'Contributor':
           this.isContributor = true;
           break;
        default:
          this.isGuest = true;
      }
    }
   }
}
