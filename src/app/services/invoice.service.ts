import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

const API = 'http://localhost:8082/api/supplierFinance/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  //https://nsrathore.medium.com/creating-custom-key-for-new-record-in-realtime-database-firebase-angular-48659118d047

  invDetailList: AngularFireList<any>;
  oneInvOfUser : AngularFireList<any>;

  constructor(private http:HttpClient, private firebase: AngularFireDatabase) { }

  tableName = 'invoice'; // node/collection
  dbRef = this.firebase.database.ref(this.url);

  getInvoiceDetailList() {
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    let node_url= "invoice/"+ user.id;
    this.invDetailList = this.firebase.list(node_url);
  }

  getInvByUserID_and_InvID(userID:string,invID:number){
    let node_url= 'invoice/'+userID+'/'+ invID;
    this.oneInvOfUser = this.firebase.list(node_url);
  }

  insertImageDetails(invDetails:any, clientId:string, row_id:string) {
    this.dbRef.child(row_id).set(invDetails);
  }
  
  deleteItem(){
    //this.dbRef.child(key).remove();
  }
  updateItem(){
    // this.dbRef.child(key).update(item);
  }

  get url() {
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    return `${this.tableName}/${user.id}`;
  }
  
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
    return this.http.get(API+'supplier/getall');
  }

  updateInvUrl(invoiceId:number, invoiceUrl:string):Observable<any>{
    return this.http.put(API+'innvoice/update/'+invoiceId,{
      invoiceId : invoiceId,
      invoiceUrl  : invoiceUrl
    }, httpOptions);
  }

  getInvoiceByRole(user_id:any, role:any):Observable<any>{
    return this.http.post(API + 'innvoice/getByRole',{
      userId : user_id,
      role: role
    }, httpOptions);
  }

  // getInvByURL():Observable<any>{
  //   return this.http.get('https://firebasestorage.googleapis.com/v0/b/angular-image-gallery-399ea.appspot.com/o/9%2F12_05_2021_1623131247441?alt=media&token=a6c3bda7-b49b-49b3-baa2-449fb2f95f33');
  // }
}
