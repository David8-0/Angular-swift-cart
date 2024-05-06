import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl:string='http://localhost:3000/api/v1/order';
  constructor(private _httpClient:HttpClient) { }

  getAll():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }

  getUserOrders():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }

  createOrder():Observable<any>{
    return this._httpClient.post(`${this.baseUrl}`,{});
  }
  
  

}
