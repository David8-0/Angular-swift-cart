import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit{
  heartClass:string="fa-regular";
  constructor(){}
  @Input() holder:Product={} as Product;
  @Input() mode:string="";   // wishlist seller user 
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    if(this.holder.isfavorite)  this.heartClass="fa-solid";
    console.log(this.holder);
    
  }
  


  delete(id:string):void {
    this.emitter.emit(`delete,${id}`);
  }
  addToCart(id:string):void {
    this.emitter.emit(`addToCart,${id}`);
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
}
