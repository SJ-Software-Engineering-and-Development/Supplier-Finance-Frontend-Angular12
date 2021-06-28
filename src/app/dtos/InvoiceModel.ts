import { Client } from "./ClientModel";
import { Supplier } from "./SupplierModel";

export class Invoice {

    innvoiceId:number;
	innvoiceDate:string
	amount:number;
	status:string;
	invoiceUrl:string;
	currency:string;
    client :Client;
    supplier:Supplier;

    constructor(invoice:Invoice){
        this.innvoiceId = invoice.innvoiceId || 0;
        this.innvoiceDate = invoice.innvoiceDate;
        this.amount = invoice.amount;
        this.status = invoice.status;
        this.invoiceUrl = invoice.invoiceUrl;
        this.currency = invoice.currency;
        this.client = invoice.client;
        this.supplier = invoice.supplier;
    }
} 