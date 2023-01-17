import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of, tap } from "rxjs";
import { UserService } from "../user.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private userService: UserService) {}

    validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
        return this.userService.isUsernameUnique(control.value)
                .pipe(
                    map(({available}: any) => available ? null : { notUniqueUsername: true }),
                    catchError(error => {
                        console.log(error);
                        return error.error.username 
                                ? of({ notUniqueUsername: true })
                                : of({ error: error.message });
                    })
                )
    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error('Method not implemented.');
    }
}
