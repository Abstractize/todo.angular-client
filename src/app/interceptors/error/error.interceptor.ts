import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isUserLoggedIn = authService.isAuthenticated;

      switch (error.status) {
        case 401:
          if (isUserLoggedIn) {
            authService.logout().subscribe(() => {
              router.navigate(['/auth/login']);
            });
          }
          break;

        case 403:
          console.warn('Acceso prohibido');
          break;

        case 404:
          router.navigate(['/not-found']);
          break;

        case 500:
          console.error('Error interno del servidor');
          break;

        default:
          console.error(`Error HTTP: ${error.status}`, error.message);
          break;
      }

      return throwError(() => error);
    })
  );
};