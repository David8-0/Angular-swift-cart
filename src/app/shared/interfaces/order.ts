import { Product } from "./product";
import { User } from "./user";

export interface Order {
    user: User,
    products: Product[],
    
}
