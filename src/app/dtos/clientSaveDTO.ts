import { accountSaveDTO } from "./accountSaveDTO";

export class clientSaveDTO {
    
    username:string;
    email:string;
    role:any;
    password:string;
    fullName:string;
    city:string;
    state:string;
    county:string;
    phoneNumber:string;
    creditLimit:number;
    account:accountSaveDTO;
}