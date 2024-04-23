import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart';



@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  baseUrl:string='http://localhost:3000/api/v1/cart';
  numOfItems:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItems:BehaviorSubject<Cart> = new BehaviorSubject<Cart>({} as Cart);
  constructor(private _httpClient:HttpClient) { 
    this.getCart().subscribe({
      next: (res)=>{
        this.numOfItems.next(res.data.numberOfItems);
        this.cartItems.next(res.data.cart);
      }
    })
  }

  addProduct(id:string):Observable<any>{
    return this._httpClient.post(`${this.baseUrl}`,{
      productId:id
    });
  }

  removeProduct(id:string):Observable<any>{
    return this._httpClient.patch(`${this.baseUrl}`,{
      productId:id
    });
  }

  deleteProduct(id:string):Observable<any>{
    return this._httpClient.put(`${this.baseUrl}`,{
      productId:id
    });
  }

  getCart():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }

  clearCart():Observable<any>{
    return this._httpClient.delete(`${this.baseUrl}`);
  }

  filterProducts(products:Product[],favorites:Product[]){
    products.forEach(p => {
      favorites.forEach(f =>{
        if(f._id === p._id) {
          p.isfavorite=true;
        }
      });
    });
    
  }
}
