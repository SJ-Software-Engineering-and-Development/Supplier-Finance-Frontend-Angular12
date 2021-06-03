import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const AUTH_API = 'http://localhost:8082/api/supplierFinance/innvoice/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  
  constructor(private http:HttpClient) { }

  uploadInvoice(newInvoice:any): Observable<any> {
    
    return this.http.post(AUTH_API + 'upload', {

      innvoiceDate : newInvoice.innvoiceDate,
      amount : newInvoice.amount,
      status : newInvoice.status,
      invoiceFile : newInvoice.invoiceFile,
      currency: newInvoice.currency,
      suserId : newInvoice.suserId,
      cuserId : newInvoice.cuserId

    }, httpOptions);
  }

  public getInvoice() {
    this.http.get(AUTH_API + 'get_invoices')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }


}
