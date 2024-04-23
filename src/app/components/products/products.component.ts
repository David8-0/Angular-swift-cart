import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../../shared/services/product.service';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { FavoritesServiceService } from '../../shared/services/favorites-service.service';

interface PageEvent  {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  data:Product[] = [];

  constructor(
    private _authService : AuthenticationService,
    private _productService: ProductService,
    private _cartService: CartServiceService,
    private _favoritesService: FavoritesServiceService
  ){}

  ngOnInit(): void {
    this._productService.getProducts(6,1).subscribe({
      next:(data)=>{
        console.log(data.data.products);
        this.data = data.data.products;
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  deleteProduct(productId:string){
    this._productService.deleteProductById(productId).subscribe({
      next:(data)=>{this.data=data.data},
      error:(err)=>console.log(err),
    })
  }

  addToCart(productId:string){
    this._cartService.addProduct(productId).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  addToFavorites(productId:string){
    this._favoritesService.add(productId).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  removeFromFavorites(productId:string){
    this._favoritesService.remove(productId).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  recData(data:string){
    let arr = data.split(',');
    switch(arr[0]){
      case "delete":
        this.deleteProduct(arr[1]);
        break;
      case "addToCart":
        this.addToCart(arr[1]);
        break;
      case "addToFavorites":
        this.addToFavorites(arr[1]);
        break;
      case "removeFromFavorites":
        this.removeFromFavorites(arr[1])
        break;
      default:
          break;
    }
    
  }

}
