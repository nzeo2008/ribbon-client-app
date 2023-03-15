import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { AUTH_API_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(user: Pick<IUser, 'email' | 'password'>): Observable<any> {
    return this.http.post(AUTH_API_ENDPOINT + 'login', {
      email: user.email,
      password: user.password,
    });
  }

  public register(user: Omit<IUser, 'id'>): Observable<any> {
    return this.http.post(AUTH_API_ENDPOINT + 'register', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }
}
