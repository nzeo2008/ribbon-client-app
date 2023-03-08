import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API_ENDPOINT } from '../constants/constants';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API_ENDPOINT + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API_ENDPOINT);
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.post(USER_API_ENDPOINT + 'update', user);
  }
}
