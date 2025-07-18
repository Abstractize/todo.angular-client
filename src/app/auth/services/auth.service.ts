import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthResponse, LoginRequest, RegisterRequest } from '@auth/models';
import { AuthRepository } from '@auth/repositories';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable().pipe(
    filter(value => value !== null && value !== undefined)
  );

  public userFullName$: Observable<string> = this.isAuthenticated$.pipe(
    switchMap(isAuth => {
      if (!isAuth) return of('');
      const token = this.getAccessToken();
      if (!token) return of('');
      const payload = this.decodeJwtPayload(token);
      return of(payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '');
    })
  );

  public userId$: Observable<string> = this.isAuthenticated$.pipe(
    switchMap(isAuth => {
      if (!isAuth) return of('');
      const token = this.getAccessToken();
      if (!token) return of('');
      const payload = this.decodeJwtPayload(token);
      return of(payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '');
    })
  );

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly router: Router
  ) { }

  // ===== Getters =====
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  // ===== Public Methods =====

  initializeAuth(): Observable<void> {
    const hasAccess = this.hasValidAccessToken();
    const hasRefresh = this.getRefreshToken();

    if (hasAccess) {
      this.isAuthenticatedSubject.next(true);
      return of(void 0);
    }

    if (hasRefresh) {
      return this.refreshToken().pipe(
        catchError(() => {
          this.forceLogout();
          return of(void 0);
        })
      );
    }

    this.forceLogout();
    return of(void 0);
  }

  register(request: RegisterRequest): Observable<void> {
    return this.authRepository.register(request).pipe(
      tap(res => {
        this.storeTokens(res);
        this.isAuthenticatedSubject.next(true);
      }),
      switchMap(() => of(void 0))
    );
  }

  login(request: LoginRequest): Observable<void> {
    return this.authRepository.login(request).pipe(
      tap(res => {
        this.storeTokens(res);
        this.isAuthenticatedSubject.next(true);
      }),
      switchMap(() => of(void 0))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.forceLogout();
      return of(void 0);
    }

    return this.authRepository.logout({ refreshToken }).pipe(
      tap(() => this.forceLogout()),
      catchError(() => {
        this.forceLogout();
        return of(void 0);
      })
    );
  }

  refreshToken(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token found'));

    return this.authRepository.refreshToken({ refreshToken }).pipe(
      tap(res => {
        this.storeTokens(res);
        this.isAuthenticatedSubject.next(true);
      }),
      switchMap(() => of(void 0)),
      catchError(err => {
        this.forceLogout();
        return throwError(() => err);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // ===== Private Helpers =====

  private storeTokens(res: AuthResponse): void {
    localStorage.setItem(this.accessTokenKey, res.token);
    localStorage.setItem(this.refreshTokenKey, res.refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const payload = this.decodeJwtPayload(token);
    const exp = payload?.exp;
    const now = Math.floor(Date.now() / 1000);
    return !!exp && exp > now;
  }

  private decodeJwtPayload(token: string): any | null {
    try {
      const base64 = token.split('.')[1];
      const json = atob(base64);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  private forceLogout(): void {
    this.clearTokens();
    this.isAuthenticatedSubject.next(false);
  }
}