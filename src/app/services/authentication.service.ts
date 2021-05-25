import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/index';
import { User } from '../dtos/user';
import {map} from 'rxjs/internal/operators';
import { HttpClientModule } from '@angular/common/http';

// const BASE_URL = "http://localhost:8082/supplierfinance/api/";
// const URL = "user/login/";

const AUTH_API = 'http://localhost:8082/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
/**
 * Author : SJ.Peeris
 * 
 */
  
  // user:User;
  isValid:boolean;
  constructor(private http:HttpClient) { }

  // authenticate(params: any = null, filterParams: any = null): Observable<any> {
  //   // const headers = new HttpHeaders().set('security-token', localStorage.getItem('security_token'));
  //   return this.http
  //     .get(BASE_URL + URL + "1", {
  //       observe: 'response',
  //     })
  //     .pipe(
  //       map((response) => {
  //         sessionStorage.setItem('user', "value___");
  //         // const { data }: any = response.body;
  //          console.log(response.status);
  //         return response.body;
  //       })
  //     );
  // }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password,
      roles: "['ROLE_BUYER']"
    }, httpOptions);
  }

  register(user:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('auth-token')
    // console.log(!(user === null))
    return !(user === null)
  }

  logOut(){
    sessionStorage.removeItem('user')
  }
}
