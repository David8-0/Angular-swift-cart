import { Cart } from "./cart";
import { Product } from "./product";

export interface User {
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    role:['user','seller'],
    Age:number,
    phone:string,
    img:any,
    address:string,
    cart:Cart,
    favorites:Product[],
    sellerProducts:Product[],
}

export enum Role{
    user,
    seller
}
