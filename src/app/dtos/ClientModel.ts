export class Client {

  clientId:string;
  name:string;
  city:string;
  state:string;
  country:string;
  phoneNumber:string;
  creditLimit:number;

  constructor(client:Client){
    this.clientId = client.clientId || '';
    this.name = client.name || '';
    this.city = client.city || '';
    this.state = client.state || '';
    this.country = client.country || '';
    this.phoneNumber = client.phoneNumber || '';
    this.creditLimit = client.creditLimit || 0.00;
  }
}