import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private readonly authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login, e.g., redirect to dashboard
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., show an error message
      }
    });
  }
}
