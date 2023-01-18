import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, skipWhile, take, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanMatch {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.observableLogged.pipe(
      skipWhile((value) => value === null),
      map(value => value!),  
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/ ');
        }
      })
    );
  }
} 