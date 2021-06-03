import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/index';
import { User } from '../dtos/user';
import { map } from 'rxjs/internal/operators';
import { HttpClientModule } from '@angular/common/http';
import { supplierSaveDTO } from '../dtos/supplierSaveDTO';
import { clientSaveDTO } from '../dtos/clientSaveDTO';

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
 supplierSaveDTO_: supplierSaveDTO;
  
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

  supplierSignup(newSupplier:supplierSaveDTO): Observable<any> {
    
    return this.http.post(AUTH_API + 'supplierSignup', {
      username: newSupplier.username,
      email: newSupplier.email,
      role:["ROLE_SELLER"],
      password: newSupplier.password,
      fullName : newSupplier.fullName,
      city : newSupplier.city,
      state : newSupplier.state,
      county : newSupplier.county,
      phoneNumber : newSupplier.phoneNumber,
      supplierLimit :newSupplier.supplierLimit,
      account : {
        accountNumber : newSupplier.account.accountNumber,
        bankName : newSupplier.account.bankName,
        accountType : newSupplier.account.accountType,
        bankCode : newSupplier.account.bankCode
  }
    }, httpOptions);
  }

  clientSignup(newClient:clientSaveDTO): Observable<any> {
    
    return this.http.post(AUTH_API + 'clientSignup', {

        username:newClient.username,
        email: newClient.email,
        role:["ROLE_BUYER"],
        password: newClient.password,
        fullName :  newClient.fullName,
        city :  newClient.city,
        state : newClient.state,
        county : newClient.county,
        phoneNumber : newClient.phoneNumber,
        creditLimit : newClient.creditLimit,
        account : {
            accountNumber : newClient.account.accountNumber,
            bankName : newClient.account.bankName,
            accountType : newClient.account.accountType,
            bankCode : newClient.account.bankCode
        }
     
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
