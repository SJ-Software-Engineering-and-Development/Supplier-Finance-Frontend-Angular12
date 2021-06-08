import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  invList: any[];
  closeResult: string;//Modal close Result
 // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc:any;

  constructor(private invoiceService: InvoiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
     this.getInvoices();
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



}