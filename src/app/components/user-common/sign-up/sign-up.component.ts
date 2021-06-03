import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { supplierSaveDTO } from 'src/app/dtos/supplierSaveDTO';
import { accountSaveDTO } from 'src/app/dtos/accountSaveDTO';
import Swal from 'sweetalert2';
import { clientSaveDTO } from 'src/app/dtos/clientSaveDTO';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class SignUpComponent implements OnInit {
  /**
   * Author : SJ.Peeris
   */

  getAppList(){
    console.log('getAppList');
  }

  user_obj={
    "username":"kasun",
    "email":"kasun@gmail.com",
    "role":["ROLE_SELLER"],
    "password":"password",
    "fullName" : "Sanjaya",
    "city" : "kelaniya",
    "state" : "West",
    "county" : "Sri",
    "phoneNumber" : "12344",
    "supplierLimit" : 2000.00,
    "account" : {
        "accountNumber" : 12345678,
        "bankName" : "Kiri",
        "accountType" : "CREDIT",
        "bankCode" : "22455"
    }
  }

   hide = true;
   frmPersonalInf: FormGroup;
   frmCreditAcc: FormGroup;
   frmLoanAcc: FormGroup;
   frmAccCredentials: FormGroup;

    newSupplier = new supplierSaveDTO(); 
    newClient = new clientSaveDTO();
    Bankacc = new accountSaveDTO();

    isLoggedIn = false;
    isLoginFailed = false;
    isSeller=false;
    isBuyer=true;
    floatLabelControl_invoicePayment = new FormControl('auto');

    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    roles: string[] = [];
    Role:string="ROLE_SELLER";

  constructor(private tokenStorage: TokenStorageService, private authService: AuthenticationService,private _formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.frmPersonalInf = this._formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.maxLength(120), Validators.minLength(3)]),
      country: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      province: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      contactNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.frmCreditAcc = this._formBuilder.group({
      creditAccNo : new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(10)]),
      creditAccBankName: new FormControl('', Validators.required),
      creditBankCode: new FormControl('', Validators.required),
      SuplierLimit: new FormControl('', Validators.required),
      invoicePayment: this.floatLabelControl_invoicePayment
    });
    
    this.frmLoanAcc = this._formBuilder.group({
      loanAccNo: new FormControl('', [Validators.required,Validators.maxLength(20), Validators.minLength(10)]),
      loanAccBankName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]),
      loanBankCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      creditLimit: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)])
    });

    this.frmAccCredentials= new FormGroup({
      userName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)])
    });


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  
  goForward(stepper: MatStepper, Role_:string){
    this.Role = Role_;
    if(Role_==='ROLE_SELLER'){
      this.isSeller=true;
      this.isBuyer=false;
    }else{
      this.isSeller=false;
      this.isBuyer=true;
    }

    stepper.next();
  }

  clicksub(): void {
       
    if(this.isSeller){
      this.newSupplier.username = this.frmAccCredentials.value.userName;
      this.newSupplier.email =this.frmPersonalInf.value.email;
      this.newSupplier.role =[this.Role];
      this.newSupplier.password =this.frmAccCredentials.value.password;
      this.newSupplier.fullName =this.frmPersonalInf.value.fullName;
      this.newSupplier.city =this.frmPersonalInf.value.city;
      this.newSupplier.state =this.frmPersonalInf.value.state;
      this.newSupplier.county =this.frmPersonalInf.value.country;
      this.newSupplier.phoneNumber =this.frmPersonalInf.value.contactNo;
      this.newSupplier.supplierLimit =this.frmCreditAcc.value.SuplierLimit;
 
      this.Bankacc.accountNumber = this.frmCreditAcc.value.creditAccNo;
      this.Bankacc.bankName = this.frmCreditAcc.value.creditAccBankName;
      this.Bankacc.accountType = "CREDIT";
      this.Bankacc.bankCode = this.frmCreditAcc.value.creditBankCode;
      this.newSupplier.account = this.Bankacc;

      this.authService.supplierSignup(this.newSupplier).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          this.frmAccCredentials.reset();
          this.frmCreditAcc.reset();
          this.frmLoanAcc.reset();
          this.frmAccCredentials.reset();

          Swal.fire(
          'Successfully Registered!',
          'Your seller account is ready.',
          'success'
        )
          this.reloadPage();         
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else if(this.isBuyer){
    
      this.newClient.username = this.frmAccCredentials.value.userName;
      this.newClient.email =this.frmPersonalInf.value.email;
      this.newClient.role =[this.Role];
      this.newClient.password =this.frmAccCredentials.value.password;
      this.newClient.fullName =this.frmPersonalInf.value.fullName;
      this.newClient.city =this.frmPersonalInf.value.city;
      this.newClient.state =this.frmPersonalInf.value.state;
      this.newClient.county =this.frmPersonalInf.value.country;
      this.newClient.phoneNumber =this.frmPersonalInf.value.contactNo;
      this.newClient.creditLimit =this.frmLoanAcc.value.creditLimit;
 
      this.Bankacc.accountNumber = this.frmLoanAcc.value.loanAccNo;
      this.Bankacc.bankName = this.frmLoanAcc.value.loanAccBankName;
      this.Bankacc.accountType = "LOAN";
      this.Bankacc.bankCode = this.frmLoanAcc.value.loanBankCode;
      this.newClient.account = this.Bankacc;

      this.authService.clientSignup(this.newClient).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          this.frmAccCredentials.reset();
          this.frmCreditAcc.reset();
          this.frmLoanAcc.reset();
          this.frmAccCredentials.reset();

          Swal.fire(
            'Successfully Registered!',
            'Your buyer account is ready.',
            'success'
          )
          this.reloadPage(); 
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
    
  }

  get fPersonal() {
    return this.frmPersonalInf.controls;
  }

  get fCreditAc() {
    return this.frmCreditAcc.controls;
  }

  get fLoanAc() {
    return this.frmLoanAcc.controls;
  }

  get fAccCredential() {
    return this.frmAccCredentials.controls;
  }
 
  reloadPage(): void {
    window.location.reload();
  }
}
