export class Supplier {

     supplierId:string;
	 name:string;
	 city:string;
	 state:string;
	 country:string;
	 phoneNumber:string;
	 supplierLimit:number;

     constructor(supplier:Supplier){
        this.supplierId = supplier.supplierId || '';
        this.name = supplier.name || '';
        this.city = supplier.city || '';
        this.state = supplier.state || '';
        this.country = supplier.country || '';
        this.phoneNumber = supplier.phoneNumber || '';
        this.supplierLimit = supplier.supplierLimit || 0.00;
     }
}