import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';

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
  suppliers = [];

  isSuccessful = false;
  errorMessage = '';

  newInvoice = {
    innvoiceDate : '',
    amount : '',
    status : '',
    invoiceUrl : '',
    currency : '',
    supplier_id : 0,
    cus_user_id : 0,
  }

  // row_id="001";
  user_id="";

  //Firebase....save
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  invoice = {
    client_user_id:'',
    supplier_id:'',
    invoiceUrl:''
  };

  //Firebase....fetch
  imageList: any[];
  rowIndexArray: any[];

  constructor(private storage: AngularFireStorage, private tokenStorage :TokenStorageService, private invoiceService: InvoiceService,private _formBuilder: FormBuilder) { 
    
    // async Suppliers
    // of(this.getSuppliers()).subscribe(suppliers_ => {
    //   this.suppliers = suppliers_;
    // });
    this.getSuppliers();
  }

  ngOnInit(): void {
    //Get user Id
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.user_id = user.id;

    this.invoiceService.getImageDetailList(this.user_id);

    //Create Form Group
    this.frmInvoice = this._formBuilder.group({
      invoiceDate: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      invoice_file_name : new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      suppliers: ['']
    });
  }
  
  //Firebase......
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  uploadToCloud(inv_data:any){
    var filePath = `${this.user_id}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;

      const fileRef = this.storage.ref(filePath);
      //Upload File to Cloud Storage
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            //invoiceId: 7, supplierId: 2, clientUserId: 3
            this.invoice.invoiceUrl = url;
            this.invoice.client_user_id = inv_data.clientUserId;
            this.invoice.supplier_id = inv_data.supplierId;

            //Insert FileUrl to Cloud Database
            this.invoiceService.insertImageDetails(this.invoice, inv_data.clientUserId, inv_data.invoiceId);         
          })
        })
      ).subscribe(
          data => {
            console.log("==========================Cloud data=======================");
            console.log(data);
            //  this.InsertUploadedInfo();
            //Update URL
            alert('Upload Done!')
          },
          err =>{
            console.log(err);
          }
      );
  }

  InsertUploadedInfo(){
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log(this.frmInvoice.value);
      //data
      this.newInvoice = {

          innvoiceDate : this.frmInvoice.value.invoiceDate,
          amount : this.frmInvoice.value.amount,  
          status :  "PENDING",
          invoiceUrl : 'cloud_url++++++++++',
          currency :  this.frmInvoice.value.currency,
          supplier_id : 2,
          cus_user_id :  user.id
        
      } 
      //API call
      this.invoiceService.uploadInvoice(this.newInvoice).subscribe(
        data => {
          this.isSuccessful = true;
          this.frmInvoice.reset();

          //invoiceId: 7, supplierId: 2, clientUserId: 3
          this.uploadToCloud(data);
        //   Swal.fire(
        //   'Successfully Uploaded!',
        //   'Your is uploaded.',
        //   'success'
        // )         
        },
        err => {
          this.errorMessage = err.error.message;         
        }
      );
  }


  resetForm() {
    this.frmInvoice.reset();

    this.selectedImage = null;
    this.isSubmitted = false;
  }

  //Fetch data
  fetchFirebaseData() :void{
    this.invoiceService.imageDetailList.snapshotChanges().subscribe(
      list => {
      
        this.imageList = list.map(item => { return item.payload.val(); });
        console.log(this.imageList);
        console.log("===========================");
        console.log(this.imageList[0]);
        console.log("===========================");
        console.log(this.imageList[0].caption);
        // console.log(this.imageList.map(obj =>{
        //   return obj.category;
        // }));
        
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }

  //....Firebase

  getSuppliers() {

     this.invoiceService.getAllSuppliers().subscribe(
      data => {
        console.log("==============getAllSuppliers==============");
        console.log(data);
        this.suppliers = data;
      },
      err => {
        console.log(err);
      }
    );
    
    // return [
    //   { id: '1', name: 'order 1' },
    //   { id: '2', name: 'order 2' },
    //   { id: '3', name: 'order 3' },
    //   { id: '4', name: 'order 4' }
    // ];
  }

  clicksub(): void {

    this.InsertUploadedInfo();
   
  }

  

}
