import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyemail-confirmed',
  templateUrl: './verifyemail-confirmed.component.html',
  styleUrls: ['./verifyemail-confirmed.component.css']
})
export class VerifyEmailConfirmedComponent implements OnInit {
  error: string;
  loading: boolean;
  success: boolean;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.success = false;

    this.route.queryParams.subscribe(params => {
      console.log(params);
      const userId = params['userId'];
      const code = params['code'];

      this.authService.verifyEmail(userId, code)
        .then(res => { this.success = true; this.loading = false; })
        .catch((err: string) => {
          this.error = err;
          this.loading = false;
        });
    });

  }

}
