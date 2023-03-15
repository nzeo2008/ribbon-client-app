import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { TOKEN_KEY, USER_KEY } from '../constants/constants';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getInfoFromJWTToken(token: string): any {
    return jwtDecode(token);
  }

  public saveUser(user: IUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const userKey = sessionStorage.getItem(USER_KEY);
    if (!userKey) return null;
    return JSON.parse(userKey);
  }

  logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
