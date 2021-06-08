import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadInvoiceComponent } from './components/buyer/invoice/upload-invoice/upload-invoice.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ViewInvoiceComponent } from './components/buyer/invoice/view-invoice/view-invoice.component';

// FireBase
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
//Environment
import { environment } from "../environments/environment";

import { PdfViewerModule } from 'ng2-pdf-viewer';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

const appRountes: Routes=[
  {path: '', component: LandingComponent},
  {path:'app_pagecontainer', component: PagecontainerComponent},
  {path:'buyer_dashboard', component: BuyerDashboardComponent,canActivate: [AuthGuardService]},
  {path:'seller_dashboard', component: SellerDashboardComponent, canActivate: [AuthGuardService]},
  {path:'banker_dashboard', component: BankerDashboardComponent,canActivate: [AuthGuardService]},
  {path:'utility', component: PagecontainerComponent,canActivate: [AuthGuardService]},
  {path:'buyer-invoice_upload', component: UploadInvoiceComponent},
  {path:'buyer-invoice_show', component: ViewInvoiceComponent,canActivate: [AuthGuardService]}
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
    UploadInvoiceComponent,
    ViewInvoiceComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(appRountes)],
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    PdfViewerModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
