export interface User {
    bankaccount?:string;
    name:string;
    lastname:string;
    uid?:string;
    password?:any;
    email?:any;
    verifyemail?:boolean;
    moderator:boolean;
    address: string;
    postcode: string;
    city: string;
    firstmod?: boolean;
    phone: string;
}