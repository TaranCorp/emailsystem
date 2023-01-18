import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../user.service';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),  
          Validators.maxLength(20)  
        ]
      }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),  
      Validators.maxLength(20)  
    ])
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next:() => {
        this.password.reset();
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => {
        this.password.reset()
        if (error.username && error.password) {
          this.loginForm.setErrors({ incorrectCredentials: true })
          return of({ incorrectCredentials: true });
        }
        return of({ unexpectedError: true });
      }
    });
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
