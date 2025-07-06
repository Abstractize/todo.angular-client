import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  currentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched();
      return;
    }

    const { firstname, lastname, email, password } = this.currentForm.value;

    const registerRequest = {
      fullname: `${firstname} ${lastname}`,
      email,
      password,
    };

    this.authService.register(registerRequest).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) =>
        alert(err?.error?.message || 'Registration failed. Try again.'),
    });
  }
}