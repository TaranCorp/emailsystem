import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export class PasswordMatch {
  static validate(password: string, passwordConfirmation: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value[password] === control.value[passwordConfirmation]
              ? null 
              : { passwordsNotMatch: true }
    }
  }
}
