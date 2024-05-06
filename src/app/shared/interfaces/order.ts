import { Product } from "./product";
import { User } from "./user";

export interface Order {
    _id: string,
    user: User,
    products: Product[],
    date:Date,
    totalPrice:number,
    status:orderStatus
}

enum orderStatus{
    Pending,
    Processing,
    Shipped,
    OutForDelivery,
    Delivered,
    Cancelled,
    Returned,
    Refunded
}