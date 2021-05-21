import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/user-common/landing/landing.component';
import { LoginComponent } from './components/user-common/login/login.component';
import { SignUpComponent } from './components/user-common/sign-up/sign-up.component';
import { FoggetPasswordComponent } from './components/user-common/fogget-password/fogget-password.component';
import { BankerDashboardComponent } from './components/banker/banker-dashboard/banker-dashboard.component';
import { BankerNavBarComponent } from './components/banker/banker-nav-bar/banker-nav-bar.component';
import { BankerSlideBarComponent } from './components/banker/banker-slide-bar/banker-slide-bar.component';
import { FooterComponent } from './components/user-common/footer/footer.component';
import { BuyerDashboardComponent } from './components/buyer/buyer-dashboard/buyer-dashboard.component';
import { BuyerNavBarComponent } from './components/buyer/buyer-nav-bar/buyer-nav-bar.component';
import { BuyerSlideBarComponent } from './components/buyer/buyer-slide-bar/buyer-slide-bar.component';
import { SellerDashboardComponent } from './components/seller/seller-dashboard/seller-dashboard.component';
import { SellerNavBarComponent } from './components/seller/seller-nav-bar/seller-nav-bar.component';
import { SellerSlideBarComponent } from './components/seller/seller-slide-bar/seller-slide-bar.component';
import { LogoutComponent } from './components/user-common/logout/logout.component';
import { PagecontainerComponent } from './components/user-common/pagecontainer/pagecontainer.component';

const appRountes: Routes=[
  // {path: '', component: LoginComponent},
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path:'logout', component: LogoutComponent},
  {path:'buyer_dashboard', component: BuyerDashboardComponent},
  {path:'seller_dashboard', component: SellerDashboardComponent},
  {path:'utility', component: PagecontainerComponent}
  
  // {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    FoggetPasswordComponent,
    BankerDashboardComponent,
    BankerNavBarComponent,
    BankerSlideBarComponent,
    FooterComponent,
    BuyerDashboardComponent,
    BuyerNavBarComponent,
    BuyerSlideBarComponent,
    SellerDashboardComponent,
    SellerNavBarComponent,
    SellerSlideBarComponent,
    LogoutComponent,
    PagecontainerComponent,
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(appRountes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
