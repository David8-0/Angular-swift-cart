import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  baseUrl:string='http://localhost:3000/api/v1/cart';
  constructor(private _httpClient:HttpClient) { }

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

  getCart():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }

  clearCart():Observable<any>{
    return this._httpClient.delete(`${this.baseUrl}`);
  }

}
