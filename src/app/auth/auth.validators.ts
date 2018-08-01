import { AsyncValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class SignUpValidators {

   static usernameValidator(authService: AuthService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
         return timer(500).pipe(
            switchMap(() => {
               return authService.checkUsername(control.value).pipe(
                  map(isUsernameAvailable => {
                     return isUsernameAvailable ? null : { 'usernameTaken': true };
                  })
               );
            })
         );
      };
   }

   static emailValidator(authService: AuthService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
         return timer(500).pipe(
            switchMap(() => {
               return authService.checkEmail(control.value).pipe(
                  map(isEmailAvailable => {
                     return isEmailAvailable ? null : { 'emailTaken': true };
                  })
               );
            })
         );
      };
   }

   static passwordsMatchValidator(fg: FormGroup): ValidationErrors | null {
      return fg.get('password').value === fg.get('confirmPassword').value
         ? null : { 'passwordsDontMatch': true };
   }

}
