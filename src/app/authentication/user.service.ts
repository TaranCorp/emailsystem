import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface LoginResponse {
  authenticated: boolean,
  username: string
}

interface LoginCredentials {
  username: string | null,
  password: string | null
}

type AuthenticationResult = boolean | null;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rootUrl = 'https://api.angular-email.com';
  logged = new BehaviorSubject<AuthenticationResult>(null);
  observableLogged = this.logged.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  isUsernameUnique(username: string): Observable<{available: boolean}> {
    return this.httpClient.post(this.rootUrl + "/auth/username", {
      username 
    }) as Observable<{available: boolean}>;
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
      tap(() => {
        this.logged.next(true);
      })
    );
  }

  checkAuthentication() {
    return this.httpClient.get<LoginResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe( 
        tap(({authenticated}) => {
          this.logged.next(authenticated);
        })
      )
  }

  logout() {
    return this.httpClient.post(`${this.rootUrl}/auth/signout`, {})
      .pipe( 
        tap(() => {
          this.logged.next(false);
        })
      )
  }

  login(credentials: any) {
    return this.httpClient.post(`${this.rootUrl}/auth/signin`, {...credentials})
      .pipe(
        tap(() => this.logged.next(true))
      )
  }
}
