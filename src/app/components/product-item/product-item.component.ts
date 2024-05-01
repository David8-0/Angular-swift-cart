import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit{
  heartClass:string="";
  constructor(){}
  @Input() holder:Product={} as Product;
  @Input() mode:string="seller";   // wishlist seller user 
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    if(this.holder.isfavorite)  this.heartClass="text-danger";
    console.log(this.holder);
    
  }
  


  delete(id:string):void {
    this.emitter.emit(`delete,${id}`);
  }
  addToCart(event:MouseEvent,id:string):void {
    event.stopImmediatePropagation()
    this.emitter.emit(`addToCart,${id}`);
  }
  addToFavorite(id:string):void {
    if(this.heartClass == ""){
      this.emitter.emit(`addToFavorites,${id}`);
      this.heartClass="text-danger";
    }else{
      this.emitter.emit(`removeFromFavorites,${id}`);
      this.heartClass = ""
    }
    
  }
}
