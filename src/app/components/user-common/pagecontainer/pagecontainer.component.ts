import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthenticationService
} from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {
  USER_ROLES
} from '../../../enums/user_roles';

@Component({
  selector: 'app-pagecontainer',
  templateUrl: './pagecontainer.component.html',
  styleUrls: ['./pagecontainer.component.scss']
})
export class PagecontainerComponent implements OnInit {

  user_role: string;
  user: any;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

 
    if (this.isLoggedIn) {
      this.user = sessionStorage.getItem('auth-user');
      var obj2 = JSON.parse(this.user);
      this.user_role = obj2.roles;
     console.log(obj2.roles[0]);

      switch (obj2.roles[0]) {
        case 'ROLE_BUYER':
          this.router.navigate(['buyer_dashboard']);
          break;
        case 'ROLE_SELLER':
          this.router.navigate(['seller_dashboard']);
          break;
        case 'ROLE_BANKER':
          this.router.navigate(['banker_dashboard']);
          break;
        case 'ROLE_WEB_MASTER':
          this.router.navigate(['web_master_dashboard']);
          break;
      }
    }


  }

}
