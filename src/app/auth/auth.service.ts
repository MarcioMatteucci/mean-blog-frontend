import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   apiUrl = environment.apiUrl;

   constructor(
      private http: HttpClient
   ) { }

   signUp(user: User) {
      return this.http.post(this.apiUrl + 'auth/signUp', user);
   }

   signIn(user: User) {
      return this.http.post(this.apiUrl + 'auth/signIn', user);
   }

   checkUsername(username: string): Observable<boolean> {
      return this.http.get(this.apiUrl + 'auth/checkUsername?username=' + username)
         .pipe(
            map((res: any) => res.isUsernameAvailable)
         );
   }

   checkEmail(email: string): Observable<boolean> {
      return this.http.get(this.apiUrl + 'auth/checkEmail?email=' + email)
         .pipe(
            map((res: any) => res.isEmailAvailable)
         );
   }

}
