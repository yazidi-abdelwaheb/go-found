import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setHeadres() {
    let jwt = this.getToken();
    jwt = 'Token ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return { headers: httpHeaders };
  }

  role: string | null = null;
  private authenticated: boolean = false;

  private url = 'https://gofound.up.railway.app/api/user/';

  constructor(private http: HttpClient, private route: Router) {}

  getToken() {
    return localStorage.getItem('authToken');
  }

  getAuthenticated(): Observable<any> {
    return this.http.get<any>(this.url + 'isAuthenticated/', this.setHeadres());
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url + 'login/', { username, password });
  }

  getuserConnecter(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url + 'me/', this.setHeadres());
  }
  logout(): Observable<any> {
    return this.http.post<any>(this.url + 'logout/', {}, this.setHeadres());
  }

  updateUserProfile(data: FormData): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      this.url + 'update/',
      data,
      this.setHeadres()
    );
  }

  register(
    username: string,
    password: string,
    email: string,
    role: string
  ): Observable<any> {
    return this.http.post<any>(this.url + 'register/', {
      username: username,
      email: email,
      password: password,
      role: role,
    });
  }

  topCreator(): Observable<any> {
    return this.http.get<any>(this.url + 'top-creators/');
  }

  topInvestors(): Observable<any> {
    return this.http.get<any>(this.url + 'top-investors/');
  }

  getuserByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      this.url + 'userByUsername/' + username,
      this.setHeadres()
    );
  }
}
