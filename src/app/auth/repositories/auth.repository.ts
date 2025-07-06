import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, TokenActionRequest } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
    constructor(private readonly httpClient: HttpClient) { }

    public login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`/api/auth/login`, loginRequest);
    }

    public refreshToken(tokenActionRequest: TokenActionRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`/api/auth/refresh`, tokenActionRequest);
    }

    public register(registerRequest: RegisterRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`/api/auth/register`, registerRequest);
    }

    public logout(tokenActionRequest: TokenActionRequest): Observable<void> {
        return this.httpClient.post<void>(`/api/auth/logout`, tokenActionRequest);
    }
}
