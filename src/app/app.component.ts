import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthService } from '@auth/services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, CoreModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'To Do Application';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.authService.initializeAuth().subscribe();
  }

  public OnActivate() {
    window.scrollTo(0, 0);
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
