import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-seller-nav-bar',
  templateUrl: './seller-nav-bar.component.html',
  styleUrls: ['./seller-nav-bar.component.scss']
})
export class SellerNavBarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
    window.location.reload();
  }
}
