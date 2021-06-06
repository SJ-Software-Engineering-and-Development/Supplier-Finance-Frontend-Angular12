import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

const API = 'http://localhost:8082/api/supplierFinance/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  //https://nsrathore.medium.com/creating-custom-key-for-new-record-in-realtime-database-firebase-angular-48659118d047

  imageDetailList: AngularFireList<any>;
  USER_ID:string='u001';

  constructor(private http:HttpClient, private firebase: AngularFireDatabase) { }

  tableName = 'invoice'; // node/collection
  dbRef = this.firebase.database.ref(this.url);

  //Firebase.....
  getImageDetailList(user_id:string) {
    //this.imageDetailList = this.firebase.list('imageDetails');
    let node_url= "invoice/" +user_id;
    this.imageDetailList = this.firebase.list(node_url);
  }

  insertImageDetails(imageDetails:any, clientId:string, row_id:string) {
  //  this.imageDetailList.push(imageDetails);
  this.dbRef.child(row_id).set(imageDetails);
  }
  
  deleteItem(){
    //this.dbRef.child(key).remove();
  }
  updateItem(){
    // this.dbRef.child(key).update(item);
  }

  get url() {
    return `${this.tableName}/${this.USER_ID}`;
  }
  
  //....Firebase

  uploadInvoice(newInvoice:any): Observable<any> {
    return this.http.post(API + 'innvoice/upload', {

      innvoiceDate : newInvoice.innvoiceDate,	
      amount : newInvoice.amount,
      status : newInvoice.status,	
      invoiceUrl : newInvoice.invoiceUrl,		
      currency : newInvoice.currency,	
      supplier_id : newInvoice.supplier_id,	
      cus_user_id : newInvoice.cus_user_id

    }, httpOptions);
  }

  public getInvoice() {
    this.http.get(API + 'innvoice/get_invoices')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  public getAllSuppliers():Observable<any>{
    return this.http.get('http://localhost:8082/api/supplierFinance/supplier/getall');
    
  }



}
