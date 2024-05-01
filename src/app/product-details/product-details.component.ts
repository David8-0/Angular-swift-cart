import { Product } from './../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { User } from '../shared/interfaces/user';
import { CartServiceService } from '../shared/services/cart-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _productService:ProductService,
    private _cartService:CartServiceService,
    private messageService: MessageService
  ){}
  productNum:number =0;
  images: string[] = [];
  productId:string="";
  product:Product = {} as Product;
  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id')??""; 
    });
    this._productService.getProductById(this.productId).subscribe({
      next:(res)=>{
        this.product = res.data.product;
        this.images = res.data.product.images;
        console.log(this.images);
        
      }
    });
  }

  decreaseNumber(){
    if(this.productNum>0)this.productNum=this.productNum-1
  }

  addToCart(productId:string){
    this._cartService.addProduct(productId,this.productNum).subscribe({
      next:(res)=>{
        this._cartService.numOfItems.next(res.data.numberOfItems);
        this._cartService.cartItems.next(res.data.cart);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product added to your cart' });
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
