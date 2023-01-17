import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './authentication/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged: BehaviorSubject<boolean>;

  constructor(private userService: UserService) {
    this.logged = this.userService.logged;
  }

  ngOnInit(): void {
    this.userService.checkAuthentication().subscribe();
  }
}
