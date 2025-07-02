import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable()
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  public login(email: string, password: string): Observable<AuthResponse> {
    const loginRequest = { email, password };
    return this.httpClient.post<AuthResponse>('/api/auth/login', loginRequest);
  }
}
