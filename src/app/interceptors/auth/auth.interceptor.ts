import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '@auth/services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap(() => {
          const newToken = authService.getAccessToken();
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          return next(retryReq);
        }),
        catchError(refreshError => {
          authService.logout().subscribe();
          return throwError(() => refreshError);
        })
      );
    })
  );
};