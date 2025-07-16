import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthService } from '@auth/services';
import { AsyncPipe } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ToastService } from '@shared/services';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, CoreModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'To-Do App';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly toast: ToastService,
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
      error: (err) => this.toast.error(err, 'Failed to log out. Please try again.')
    });
  }
}
