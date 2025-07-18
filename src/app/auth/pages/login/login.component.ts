import { Component } from '@angular/core';
import { AuthService } from '@auth/services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services';
import { HttpErrorResponse } from '@angular/common/http';

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
    private readonly router: Router,
    private readonly toast: ToastService
  ) {
    this.currentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.login(this.currentForm?.getRawValue()).subscribe({
      next: () => this.router.navigate(['/analytics']),
      error: (error: HttpErrorResponse) => this.toast.error(error, 'Login failed. Please check your credentials and try again.')
    });
  }
}
