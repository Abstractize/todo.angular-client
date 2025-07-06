import { Component } from '@angular/core';
import { AuthService } from '@auth/services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  currentForm: UntypedFormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router
  ) {
    this.currentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.login(this.currentForm?.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => {
        alert(error.error.message || 'Login failed');
      }
    });
  }
}
