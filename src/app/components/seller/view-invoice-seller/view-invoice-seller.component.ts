import { Component, ErrorHandler, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  ToasterConfig, 
  ConfirmConfig, 
  ConfirmButtonConfig,
} from 'ngx-mat-alert-confirm/lib/ngx-mat-alert-confirm.service';
import { NgxMatAlertConfirmService } from 'ngx-mat-alert-confirm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-invoice-seller',
  templateUrl: './view-invoice-seller.component.html',
  styleUrls: ['./view-invoice-seller.component.scss']
})
export class ViewInvoiceSellerComponent implements OnInit {

  invList: any[];
  closeResult: string;//Modal close Result
 // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc:any;

  constructor(
     private invoiceService: InvoiceService,
     private modalService: NgbModal,
     private alertService: NgxMatAlertConfirmService,
     private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getInvByUserIdandRole();
  }

  
  getInvoices(){
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.invoiceService.getInvoiceByRole(user.id, user.roles).subscribe(
      data => {
        this.invList = data;
      },
      err =>{
      }
    );

  }

  getInvByUserIdandRole(){
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.invoiceService.getInvByUserIdandRole(user.id, 'ROLE_SELLER').subscribe(
      (data:any)=>{
        this.invList = data;
      }, (err:ErrorHandler)=>{console.log(err)}
    );
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openPDFVIewModal(longContent:any, pdfURL:any) {

    this.pdfSrc = pdfURL;
    this.modalService.open(longContent, { scrollable: true,size: 'lg' });
    
 //   this.pdfSrc = 'https://firebasestorage.googleapis.com/v0/b/angular-image-gallery-399ea.appspot.com/o/9%2F12_05_2021_1623131247441?alt=media&token=a6c3bda7-b49b-49b3-baa2-449fb2f95f33';//pdfURL;
    // console.log(this.pdfSrc);
    // this.invoiceService.getInvByURL().subscribe(
    //   data =>{
    //     console.log(data);
    //   }, err => { alert('ERROR'); }
    // );
  }

  takeAction(){
    this.confirmConfig.buttons = this.buttonArr;
    // console.log(this.confirmConfig.buttons)
    const dialogueRef = this.alertService.confirm(
      this.confirmConfig
    );
    dialogueRef.afterClosed().subscribe(confirmResult => {
      if(confirmResult==='1') {
        // this.bookService.deleteBook(id).subscribe(
        //   (data:any) => {
        //   this.toastr.success('Book has been Deleted!', 'Success!');
        //   //**** Do not reload List, Just Delete From Local List
        //   },
        //   (error:ErrorHandler)=>{
        //     console.log(error);  
        //   })
      }
      return confirmResult;
    });
  }

  confirmConfig: ConfirmConfig = {
    "title": "Are You Sure?",
    "titleSize": 28,
    "message": "This book will Permenently Delete!",
    "messageSize": 16,
    "matIcon": "book",
    "iconColor": "",
    "buttons": [],
    "disableClose": true,
    "autoFocus": true,
    "restoreFocus": true
  }

  buttonArr: Array < ConfirmButtonConfig > = [  
    {
    id: '2',
    text: 'Cancel',
    color: 'primary',
    type: 'basic',
    icon: ''
   },
   {
    id: '1',
    text: 'Yes',
    color: 'primary',
    type: 'basic',
    icon: ''
   }
  ]

}
