import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../../shared/services/product.service';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { FavoritesServiceService } from '../../shared/services/favorites-service.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  data:Product[] = [];
  totalNumber:number = 0;
  tmpData:Product[] = [];
  favoriteList:Product[] = [];
  firstProductIndex: number = 0;
  rows: number = 6;
  
  @ViewChild('lowerInp') lowerInp!: ElementRef<HTMLInputElement>;
  @ViewChild('higherInp') higherInp!: ElementRef<HTMLInputElement>;
  @ViewChild('lthRadio') lthRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('htlRadio') htlRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('inStockRadio') inStockRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('outStockRadio') outStockRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('onSaleRadio') onSaleRadio!: ElementRef<HTMLInputElement>;

  currentParams:string="";
  lowPrice:number = 0;
  highPrice:number = 10000000;
  constructor(
    private _productService: ProductService,
    private _cartService: CartServiceService,
    private _favoritesService: FavoritesServiceService,
    private messageService: MessageService
  ){}

  resetFilters(){
    this.getProducts(this.rows,1);
    this.lthRadio.nativeElement.checked = false;
    this.htlRadio.nativeElement.checked = false;
    this.inStockRadio.nativeElement.checked = false;
    this.outStockRadio.nativeElement.checked = false;
    this.onSaleRadio.nativeElement.checked = false;
    this.lowerInp.nativeElement.value = '';
    this.higherInp.nativeElement.value = '';
    this.rows = 6;
    this.firstProductIndex=0;
  }

  ngOnInit (): void {
    this.getProducts(this.rows,1);
  }

  categorySearch(event:any){
    this.rows = 6;
    this.firstProductIndex=0;
    this.currentParams = `?category=${event.target.value}`
    this.getProducts(this.rows,1,this.currentParams);
  }

  stock(event:any){
    if (event.target.checked) {
      this.currentParams=event.target.value; 
      this.getProducts(this.rows,1,this.currentParams);
      }
  }

  searchByName(event:any){
    if(event.target.value){
      this.currentParams = `?name=${event.target.value}`;
      this.getProducts(this.rows,(this.firstProductIndex / 6)+1,this.currentParams);
    }else{
      this.currentParams = ``;
      this.getProducts(this.rows,(this.firstProductIndex / 6)+1,this.currentParams);
    }
    
  }

  sort(event:any){
    if (event.target.checked) {
      this.rows = 6;
      this.firstProductIndex=0;
      this.currentParams=event.target.value; 
    this.getProducts(this.rows,1,this.currentParams);
       
    }
  }
    priceRange(event:any){
    if(event.target.id == 'lowerThan'){
      this.highPrice=event.target.value;
      if(!event.target.value){
        this.highPrice=10000000;
      }
    }else if(event.target.id == 'higherThan'){
      this.lowPrice=event.target.value;
      if(!event.target.value){
        this.lowPrice=0;
      }
    }
    this.currentParams=`?price[lt]=${this.highPrice}&price[gt]=${this.lowPrice}`;
    this.rows = 6;
    this.firstProductIndex=0;
    this.getProducts(this.rows,1,this.currentParams);
  }


  onPageChange(event: any) {
      this.firstProductIndex = event.first;
      this.rows = event.rows;
      this.getProducts(this.rows,(this.firstProductIndex / 6)+1,this.currentParams);      
  }

  addToCart(productId:string){
    this._cartService.addProduct(productId).subscribe({
      next:(res)=>{
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this._cartService.cartItems.next(res.data.cart);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product added to your cart' });
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  addToFavorites(productId:string){
    this._favoritesService.add(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product added to your Favorites' });
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  removeFromFavorites(productId:string){
    this._favoritesService.remove(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your Product removed from your favorites' });
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  recData(data:string){
    let arr = data.split(',');
    switch(arr[0]){
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

  getProducts(limit:number,page:number,params?:string){
    this._productService.getProducts(limit,page,params).subscribe({
      next:(data)=>{
        this.tmpData = data.data.products;
        this.totalNumber=data.total;
            console.log(this.totalNumber);
        this._favoritesService.getAll().subscribe({
          next:(data)=>{
            this.favoriteList = data.data.favorites;
            this._productService.filterProducts(this.tmpData,this.favoriteList);
            this.data=this.tmpData;
          },
          error:(err)=>{
            console.log(err);
          }
        });

      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
