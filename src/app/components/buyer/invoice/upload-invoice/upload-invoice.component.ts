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

  // https://coryrylan.com/blog/creating-a-dynamic-select-with-angular-forms
  suppliers = [
    {supplierId:0, name:''}
  ];

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
  selectedSupplierId: string = '';

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
    
    //async Suppliers
    // of(this.getSuppliers()).subscribe(suppliers_ => {
    //   this.suppliers = suppliers_;
    // });
  }

  ngOnInit(): void {
    //Get user Id
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.user_id = user.id;

    this.invoiceService.getInvoiceDetailList();

    //Get suppliers
    this.getSuppliers();

    //Create Form Group
    this.frmInvoice = this._formBuilder.group({
      invoiceDate: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      invoice_file_name : new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
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

  CompletedPrecentage:number; CompletedPrecentageStyle:string;
  State:any;
  showUploadstate:string;uploadBtnText:string="Upload Invoice";
  bytesTransferred:any;
  totalBytes:any;
  inv_id:number;

  uploadToCloud(inv_data:any){
    var filePath = `${this.user_id}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;

      const fileRef = this.storage.ref(filePath);
      //Upload File to Cloud Storage
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            //invoiceId: , supplierId: , clientUserId: 
            this.invoice.invoiceUrl = url;
            this.invoice.client_user_id = inv_data.clientUserId;
            this.invoice.supplier_id = inv_data.supplierId;
           
            //Insert FileUrl to Cloud Database..............( child_node = invoiceId )
            this.invoiceService.insertImageDetails(this.invoice, inv_data.clientUserId, inv_data.invoiceId);         
          })
        })
      ).subscribe(
          data => {

            // console.log("==========================Cloud data=======================");
            // console.log(data);
            // console.log('bytesTransferred => '+ data?.bytesTransferred);
            // console.log('totalBytes => '+ data?.totalBytes);
           try{
              this.bytesTransferred = data?.bytesTransferred;
              this.totalBytes = data?.totalBytes;
              this.State = data?.state;
              this.CompletedPrecentage = (Math.round((this.bytesTransferred/ this.totalBytes)*100));
              this.CompletedPrecentageStyle =  this.CompletedPrecentage + '%';

              if(this.State == 'running')
              {
                this.showUploadstate = 'Uploading';
                this.uploadBtnText = 'Uploading...';
                this.uploadBtnText = 'Upload Invoice';
              } else if(this.State == 'success'){
                this.showUploadstate = 'Done';
                // let invURL = this.getInvURL();
                // console.log("INV URL : " +invURL);
                this.getInvURLAndUpdateInvUrl(this.inv_id);
                // this.updateInvUrl(this.inv_id, '45');
              }
           }catch(Exception){
             this.uploadBtnText = 'Upload Invoice';
             alert('Exception');
           }      
          },
          err =>{
            console.log('ERRORR');
            console.log(err);
          }
      );
  }

  insertInvoice(){
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    console.log('User Id ====== ' + user);
      //data
      this.newInvoice = {
          innvoiceDate : this.frmInvoice.value.invoiceDate,
          amount : this.frmInvoice.value.amount,  
          status :  "PENDING",
          invoiceUrl : 'url-pending',
          currency :  this.frmInvoice.value.currency,
          supplier_id : parseInt(this.selectedSupplierId),
          cus_user_id :  user.id
      } 
      //API call
      this.invoiceService.uploadInvoice(this.newInvoice).subscribe(
        data => {
          this.isSuccessful = true;
          this.frmInvoice.reset();
          this.inv_id = data.invoiceId;
           console.log("=== INV ID " + this.inv_id);
          this.uploadToCloud(data);          
        },
        err => {
          this.errorMessage = err.error.message;         
        }
      );
  }

  updateInvUrl(invoiceId:number, invoiceUrl:string) {
    this.invoiceService.updateInvUrl(invoiceId, invoiceUrl).subscribe(
      data => {
        console.log('response ===============> '+ data);
        this.uploadBtnText = 'Upload Invoice';
      }, err =>{}
    );

      this.uploadBtnText = 'Upload Invoice';
      this.CompletedPrecentageStyle =  this.CompletedPrecentage + '%';
      this.CompletedPrecentage =0;
        Swal.fire(
          'Successfully Uploaded!',
          'Invoice is uploaded.',
          'success'
        ) 
  }

  resetForm() {
    this.frmInvoice.reset();

    this.selectedImage = null;
    this.isSubmitted = false;
  }

  //Fetch data
  fetchFirebaseData() :void{
    this.invoiceService.invDetailList.snapshotChanges().subscribe(
      list => {
      
        this.imageList = list.map(item => { return item.payload.val(); });
        // console.log(this.imageList);
        // console.log("===========================");
        // console.log(this.imageList[0]);
        // console.log("===========================");
        // console.log(this.imageList[0].caption);
        
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }

  getSuppliers() {
     this.invoiceService.getAllSuppliers().subscribe(
      data => {
        this.suppliers = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  clicksub(): void {
    this.insertInvoice();
    console.log(this.frmInvoice.value);
    console.log(this.selectedSupplierId);
  }


  getInvURLAndUpdateInvUrl(invId:number){
    let oneInvUrl: string;
    let oneInv : any[];
    
    this.invoiceService.getInvByUserID_and_InvID(this.user_id, invId);

    this.invoiceService.oneInvOfUser.snapshotChanges().subscribe(
      list => {
        oneInv = list.map(item => { return item.payload.val(); });

        console.log("user_id : " +this.user_id );

        this.updateInvUrl(invId, oneInv[1]);
      }
    );
  }

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedSupplierId = event.target.value;
  } 

}
