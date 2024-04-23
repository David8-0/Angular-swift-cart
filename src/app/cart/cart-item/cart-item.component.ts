import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit{
  heartClass:string="fa-regular";
  constructor(){}
  @Input() product:Product= {} as Product;
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  
  
  ngOnInit(): void {
    // console.log("iniiit");
    console.log(this.product);
    
    if(this.product.isfavorite)  {
      this.heartClass="fa-solid";      
    }
  }

  addToFavorite(id:string):void {
    if(this.heartClass == "fa-regular"){
      this.emitter.emit(`addToFavorites,${id}`);
      this.heartClass="fa-solid";
    }else{
      this.emitter.emit(`removeFromFavorites,${id}`);
      this.heartClass = "fa-regular"
    }
  }


  removeFromCart(id:string):void {
    this.emitter.emit(`removeFromCart,${id}`);
  }

  deleteFromCart(id:string):void {
    this.emitter.emit(`deleteFromCart,${id}`);
  }

  addToCart(id:string):void {
    this.emitter.emit(`addToCart,${id}`);
  }
}
