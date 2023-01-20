import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../shared/dto/login-response';
import { Rest } from '../shared/rest';

interface LoginCredentials {
  username: string | null,
  password: string | null
}

export type AuthenticationResult = boolean | null;
type LoginResult = string | null;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl = Rest.angularEmailApiUrl;

  logged = new BehaviorSubject<AuthenticationResult>(null);
  observableLogged = this.logged.asObservable();

  username = new BehaviorSubject<LoginResult>(null);
  observableUsername = this.logged.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  isUsernameUnique(username: string): Observable<{available: boolean}> {
    return this.httpClient.post(this.rootUrl + "/auth/username", { username }) as Observable<{available: boolean}>;
  }

  createAccount(credentials: any): Observable<any>  {
    if (!credentials.username) {
      throw new Error('Username is empty.');
    }
    if (!credentials.password) {
      throw new Error('Password is empty.');
    }
    if (!credentials.passwordConfirmation) {
      throw new Error('Password confirmation is empty.');
    }
    
    return this.httpClient.post<{username: string}>(
      `${this.rootUrl}/auth/signup`,
      { ...credentials }
    ).pipe(
      tap(({ username }) => {
        this.logged.next(true);
        this.username.next(username);
      })
    );
  }

  checkAuthentication() {
    return this.httpClient.get<LoginResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe( 
        tap(({ authenticated, username }) => {
          this.logged.next(authenticated);
          this.username.next(username);
        })
      )
  }

  logout() {
    return this.httpClient.post(`${this.rootUrl}/auth/signout`, {})
      .pipe( 
        tap(() => {
          this.logged.next(false);
          this.username.next(null);
        })
      )
  }

  login(credentials: any) {
    return this.httpClient.post<LoginResponse>(`${this.rootUrl}/auth/signin`, {...credentials})
      .pipe(
        tap(({ username }) => {
          this.logged.next(true)
          this.username.next(username);
        })
      )
  }
}
