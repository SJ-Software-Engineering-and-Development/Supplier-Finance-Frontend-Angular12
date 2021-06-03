import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent implements OnInit {

  frmInvoice: FormGroup;

  // orders = [{id:0, name:''}]
  // orders = [];
  // https://coryrylan.com/blog/creating-a-dynamic-select-with-angular-forms
  suppliers = [
    { id: '1', name: 'order 1' },
    { id: '2', name: 'order 2' },
    { id: '3', name: 'order 3' },
    { id: '4', name: 'order 4' }
  ];

  isSuccessful = false;
  errorMessage = '';

  newInvoice = {
    innvoiceDate : '',
    amount : 0,
    status : '',
    invoiceFile : '',
    currency:'',
    suserId : 0,
    cuserId : 0
  }

  constructor(private tokenStorage :TokenStorageService, private invoiceService: InvoiceService,private _formBuilder: FormBuilder) { 
    // async Suppliers
    of(this.getSuppliers()).subscribe(suppliers_ => {
      this.suppliers = suppliers_;
    });
  }

  ngOnInit(): void {

    this.frmInvoice = this._formBuilder.group({
      invoiceDate: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      invoice_file_name : new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      suppliers: ['']
    });
  }
  
  getSuppliers() {
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  clicksub(): void {
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log(this.frmInvoice.value);
      //data
      this.newInvoice = {
        innvoiceDate : this.frmInvoice.value.invoiceDate,
        amount : this.frmInvoice.value.amount,      
        status: "PENDING",
        invoiceFile : this.frmInvoice.value.invoice_file_name,
        currency : this.frmInvoice.value.currency,
        suserId : 4,
        cuserId : user.id
      } 
      
      this.invoiceService.uploadInvoice(this.newInvoice).subscribe(
        data => {
          this.isSuccessful = true;

          this.frmInvoice.reset();

          Swal.fire(
          'Successfully Uploaded!',
          'Your is uploaded.',
          'success'
        )
          // this.reloadPage();
          //navigate to same url         
        },
        err => {
          this.errorMessage = err.error.message;         
        }
      );
      
  }

}
