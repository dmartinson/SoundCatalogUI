import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate-confirmemail',
  templateUrl: './verifyemail-linkgenerated.component.html',
  styleUrls: ['./verifyemail-linkgenerated.component.css']
})
export class VerifyEmailLinkGenerated implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');
    this.authService.generateConfirmEmail(email)
      .then(res => { this.router.navigate(['/showemailsent']); })
  }

}
