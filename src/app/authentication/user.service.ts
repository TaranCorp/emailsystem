import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable, tap } from 'rxjs';

const rootUrl = 'https://api.angular-email.com/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private httpClient: HttpClient) { }
  
  isUsernameUnique(username: string): Observable<{available: boolean}> {
    return this.httpClient.post(rootUrl + "auth/username", {
      username 
    }) as Observable<{available: boolean}>;
  }

  createAccount(
      username: string | null,
      password: string | null,
      passwordConfirmation: string | null
    ): Observable<any>  {
    if (!username) {
      throw new Error('Username is empty.');
    }
    if (!password) {
      throw new Error('Password is empty.');
    }
    if (!passwordConfirmation) {
      throw new Error('Password confirmation is empty.');
    }
    
    
    return this.httpClient.post<{username: string}>(rootUrl + 'auth/signup', {
      username,
      password,
      passwordConfirmation
    });
  }
}
