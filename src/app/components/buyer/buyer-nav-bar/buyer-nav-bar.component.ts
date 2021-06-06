import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-buyer-nav-bar',
  templateUrl: './buyer-nav-bar.component.html',
  styleUrls: ['./buyer-nav-bar.component.scss']
})
export class BuyerNavBarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router:Router) { }

  userName: string ='';

  ngOnInit(): void {
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.userName = user.username;
  }

  logout(){
    this.tokenStorageService.signOut();
    // this.router.navigate(['']);
    // window.location.reload();
  }

}
