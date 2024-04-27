import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string='http://localhost:3000/api/v1/product';
  constructor(private _httpClient:HttpClient) { }

  addProduct(p:Product):Observable<any>{
    return this._httpClient.post(`${this.baseUrl}`,p);
  }

  getProducts(limit:number,page:number):Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`,{
      params:{
        limit,
        page
      }
    });
  }

  getProductById(id:string):Observable<any>{
    return this._httpClient.get(`${this.baseUrl}/${id}`);
  }

  updateProductById(id:string,product:any):Observable<any>{
    console.log(product);
    console.log(id);
    
    return this._httpClient.patch(`${this.baseUrl}/${id}`,
      product
    );
  }
  updateProductImagesById(id:string,images:any):Observable<any>{

    return this._httpClient.patch(`${this.baseUrl}/${id}`,images);
  }

  deleteProductById(id:string):Observable<any>{
    return this._httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getTopSelling():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}/top-selling-products`);
  }

  getstats():Observable<any>{
    return this._httpClient.get(`${this.baseUrl}/stats`);
  }

  getSellerProducts(id:string):Observable<any>{
    return this._httpClient.get(`${this.baseUrl}`,{
      headers:{
        id
      }
    });
  }

  filterProducts(products:Product[],favorites:Product[]){
    products.forEach(p => {
      favorites.forEach(f =>{
        if(f._id === p._id) {
          p.isfavorite=true
        }
      });
    });
    
  }
}
