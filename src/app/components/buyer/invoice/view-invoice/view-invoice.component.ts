import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  invList: any[];

  constructor(private invoiceService: InvoiceService) { }

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
}
