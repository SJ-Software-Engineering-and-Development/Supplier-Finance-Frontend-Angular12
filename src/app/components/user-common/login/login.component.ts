import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
/**
 * Author : SJ.Peeris
 */

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private tokenStorage:TokenStorageService,private authService:AuthenticationService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.min(5), Validators.max(20)]),
      'password' : new FormControl(null, [Validators.required, Validators.min(6), Validators.max(120)])
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;   
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.loginForm.reset();
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  clicksub(){
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
  get f()
  {
      return this.loginForm.controls;
  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  reloadPage(): void {
    window.location.reload();
  }

}
