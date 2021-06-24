import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankerDashboardComponent } from './components/banker/banker-dashboard/banker-dashboard.component';
import { BuyerDashboardComponent } from './components/buyer/buyer-dashboard/buyer-dashboard.component';
import { UploadInvoiceComponent } from './components/buyer/invoice/upload-invoice/upload-invoice.component';
import { ViewInvoiceComponent } from './components/buyer/invoice/view-invoice/view-invoice.component';
import { SellerDashboardComponent } from './components/seller/seller-dashboard/seller-dashboard.component';
import { ViewInvoiceSellerComponent } from './components/seller/view-invoice-seller/view-invoice-seller.component';
import { LandingComponent } from './components/user-common/landing/landing.component';
import { PagecontainerComponent } from './components/user-common/pagecontainer/pagecontainer.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes=[
  {path: '', component: LandingComponent},
  {path:'app_pagecontainer', component: PagecontainerComponent},
  {path:'buyer_dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuardService]},
  {path:'seller_dashboard', component: SellerDashboardComponent, canActivate: [AuthGuardService]},
  {path:'banker_dashboard', component: BankerDashboardComponent, canActivate: [AuthGuardService]},
  {path:'utility', component: PagecontainerComponent, canActivate: [AuthGuardService]},
  {path:'buyer-invoice_upload', component: UploadInvoiceComponent},
  {path:'buyer-invoice_show', component: ViewInvoiceComponent, canActivate: [AuthGuardService]},
  {path:'seller-invoice_show', component: ViewInvoiceSellerComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
