import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FavoritesServiceService {
  baseUrl:string='http://localhost:3000/api/v1/favorites';
  constructor(private _httpClient:HttpClient) { }

  getAll():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`);
  }
  clear():Observable<any>{
    return this._httpClient.delete(`${this.baseUrl}`);
  }
  add(id:string):Observable<any>{
    return this._httpClient.post(`${this.baseUrl}`,{
      productId:id
    });
  }
  remove(id:string):Observable<any>{
    return this._httpClient.patch(`${this.baseUrl}`,{
      productId:id
    });
  }
}
