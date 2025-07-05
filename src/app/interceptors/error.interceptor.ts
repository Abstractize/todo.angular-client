import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        router.navigate(['/auth/login']);
      } else if (error.status === 403) {
        console.error('Error 403: Acceso prohibido');
      } else if (error.status === 404) {
        console.error('Error 404: Recurso no encontrado');
      } else if (error.status === 500) {
        console.error('Error 500: Error interno del servidor');
      } else {
        console.error(`Error HTTP: ${error.status}`, error.message);
      }
      return throwError(() => error);
    })
  );
};
