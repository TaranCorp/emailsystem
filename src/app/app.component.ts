import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './authentication/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged: BehaviorSubject<boolean | null>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.logged = this.userService.logged;
  }

  ngOnInit(): void {
    this.userService.checkAuthentication().subscribe();
  }

  onLogoutClick() {
    this.userService.logout().subscribe(() => {
      this.router.navigateByUrl('/auth');
    });
  }
}
