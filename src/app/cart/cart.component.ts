import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../shared/services/cart-service.service';
import { Cart } from '../shared/interfaces/cart';
import { FavoritesServiceService } from '../shared/services/favorites-service.service';
import { Product } from '../shared/interfaces/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  visibleClearDialog: boolean = false;
  cart:Cart={} as Cart;
  tmpCart:Cart={} as Cart;
  favItems:Product[] = [] as Product[];
  constructor(
    private _cartService: CartServiceService
    , private _favoritesService:FavoritesServiceService,
    private messageService: MessageService
  ){
    _favoritesService.favoriteItems.subscribe(favs=>{
      this.favItems = favs;
    });
  }
  ngOnInit(): void {
      this._cartService.getCart().subscribe({
        next:(cartRes)=>{
          this.tmpCart=cartRes.data.cart;
          this._favoritesService.getAll().subscribe({
            next: (favs)=>{ 
              console.log(favs.data.favorites);          
              this._cartService.filterProducts(this.tmpCart.products,favs.data.favorites);
              this.cart = this.tmpCart
            },
            error:(err)=>console.log(err),
          });
        },
        error:(err)=>{console.log(err)},
      });
  }

  addToCart(productId:string){
    this._cartService.addProduct(productId).subscribe({
      next:(res)=>{
        this.tmpCart=res.data.cart;
        this._cartService.filterProducts(this.tmpCart.products,this.favItems);
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this.cart=this.tmpCart;
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  removeFromCart(id:string): void {
    this._cartService.removeProduct(id).subscribe({
      next:(res)=>{
        this.tmpCart=res.data.cart;
        this._cartService.filterProducts(this.tmpCart.products,this.favItems);
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this.cart=this.tmpCart;
      },
      error:(err)=>console.log(err)
  });
  }
  deleteFromCart(id:string): void {
    this._cartService.deleteProduct(id).subscribe({
      next:(res)=>{
        this._cartService.filterProducts(this.tmpCart.products,this.favItems);
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this.cart=res.data.cart;
      },
      error:(err)=>console.log(err)
  });
  }

  addToFavorites(productId:string){
    this._favoritesService.add(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
      },
      error:(err)=>console.log(err)
    });
  }

  removeFromFavorites(productId:string){
    this._favoritesService.remove(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
      },
      error:(err)=>console.log(err),
    });
  }

  recData(data:string){
    let arr = data.split(',');
    switch(arr[0]){
      case "addToFavorites":
        this.addToFavorites(arr[1]);
        break;
      case "removeFromFavorites":
        this.removeFromFavorites(arr[1])
        break;
      case "removeFromCart":
        this.removeFromCart(arr[1]);
        break;
      case "addToCart":
        this.addToCart(arr[1]);
        break;
        case "deleteFromCart":
        this.deleteFromCart(arr[1]);
        break;
      default:
          break;
    }
    
  }

  showDialog() {
      this.visibleClearDialog = true;
  }

  yesClearCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your cart has been cleared' });
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this.cart=res.data.cart;
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem clearing your cart' });
      },
      complete:()=>{this.visibleClearDialog = false;}
    });
  }
  noClearCart(){
    this.visibleClearDialog = false;
  }


}




