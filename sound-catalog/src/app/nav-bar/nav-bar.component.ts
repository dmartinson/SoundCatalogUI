import { Component, OnInit } from '@angular/core';

// Redux
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../state/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private firstname: string;
  private lastname: string;
  private username: string;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.firstname = this.ngRedux.getState().user.firstname;
    this.lastname = this.ngRedux.getState().user.lastname;
    this.username = this.ngRedux.getState().user.username;
   }
}
