import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';
import { TokenActionRequest } from '../models/token-action-request';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public post(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`/api/auth/login`, loginRequest);
    }

    public refreshToken(tokenActionRequest: TokenActionRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`/api/auth/refresh`, tokenActionRequest);
    }

    public logout(tokenActionRequest: TokenActionRequest): Observable<void> {
        return this.httpClient.post<void>(`/api/auth/logout`, tokenActionRequest);
    }
}
