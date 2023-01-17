import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../user.service';
import { PasswordMatch } from '../validators/password-match';
import { UniqueUsername } from '../validators/unique-username';

const preparedValidators = (minLength: number, maxLength: number,) => {
  return [
    Validators.required,
    Validators.minLength(minLength),  
    Validators.maxLength(maxLength)  
  ]
}

const passwordValidators = preparedValidators(4, 20);

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(
    private uniqueUsername: UniqueUsername,
    private userService: UserService
  ) {}

  registrationForm = new FormGroup({
      username: new FormControl('', {
        validators: [
        ...preparedValidators(3, 20),
      ],
      asyncValidators: [
        this.uniqueUsername.validate.bind(this.uniqueUsername)
      ],
      updateOn: 'blur'
    }),
    password: new FormControl('', passwordValidators),
    passwordConfirmation: new FormControl('', passwordValidators)
  },
  [
     PasswordMatch.validate('password', 'passwordConfirmation')
  ]
  );

  get username() {
    return this.registrationForm.controls.username;
  }

  get password() {
    return this.registrationForm.controls.password;
  }

  get passwordConfirmation() {
    return this.registrationForm.controls.passwordConfirmation;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return ;
    }

    this.userService.createAccount(
      this.username.value,
      this.password.value,
      this.passwordConfirmation.value
    ).subscribe({
      next: (response) => {
        
      },
      error: (error) => {
        console.log(error);
        if (!error.status) {
          this.registrationForm.setErrors({ noConnection: true });
        } 
        else if (error.error.username) {
          this.username.setErrors({ notUniqueUsername: true });
        }        
        else {
          this.registrationForm.setErrors({ unknownError: true });
        }
        throw new Error(error.message);
      }
    })
  }
}
