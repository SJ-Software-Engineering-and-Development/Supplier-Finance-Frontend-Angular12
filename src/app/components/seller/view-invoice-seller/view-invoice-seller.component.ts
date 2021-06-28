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

import { Invoice } from '../../../dtos/invoiceModel';
import { INVOICE_STATUS } from 'src/app/enums/invoice_status';

@Component({
  selector: 'app-view-invoice-seller',
  templateUrl: './view-invoice-seller.component.html',
  styleUrls: ['./view-invoice-seller.component.scss']
})
export class ViewInvoiceSellerComponent implements OnInit {

  invList: any[];
  listSize =0;
  closeResult: string;//Modal close Result
 // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc:any;

  //Table Pagination
  pageSize = 8;
  page = 1;

  btn_groupActive:string="active btn btn-focus";
  btn_group:string="btn btn-focus";

  AcceptClass:string ="btn btn-focus";
  PendingClass:string ="active btn btn-focus";

  constructor(
     private invoiceService: InvoiceService,
     private modalService: NgbModal,
     private alertService: NgxMatAlertConfirmService,
     private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getInvBy_UserId_Role_Status('PENDING');
  }

  getAcceptClass():string{
    this.PendingClass=this.btn_group;
    return this.AcceptClass;
  }

  getPendingClass():string{
    this.AcceptClass= this.btn_group;
    return this.PendingClass;
  }

  getInvBy_UserId_Role_Status(invoiceStatus:string){

    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    this.invoiceService.getInvoiceByRoleAndStatus(user.id, user.roles, invoiceStatus).subscribe(
      (data:any)=>{
       this.invList = data;
       this.listSize = this.invList.length;
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
        this.toastr.info('Status not updated!', 'Alright!');
      }
      return confirmResult;
    });
  }

  confirmConfig: ConfirmConfig = {
    "title": "Take Action",
    "titleSize": 18,
    "message": "What is your Decision",
    "messageSize": 13,
    "matIcon": "book",
    "iconColor": "",
    "buttons": [],
    "disableClose": true,
    "autoFocus": true,
    "restoreFocus": true
  }

  buttonArr: Array < ConfirmButtonConfig > = [  
    {
      id: '3',
      text: 'Deny',
      color: 'primary',
      type: 'basic',
      icon: ''
     },
     {
      id: '2',
      text: 'Accept',
      color: 'primary',
      type: 'basic',
      icon: ''
     },
     {
      id: '1',
      text: 'Take action later',
      color: 'primary',
      type: 'basic',
      icon: ''
     }
  ]

}
