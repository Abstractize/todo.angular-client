import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}