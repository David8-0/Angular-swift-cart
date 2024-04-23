import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit{
  constructor(){}
  @Input() holder:Product={} as Product;
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  delete(id:string):void {
    this.emitter.emit(`delete,${id}`);
  }
  addToCart(id:string):void {
    this.emitter.emit(`addToCart,${id}`);
  }
  addToFavorite(id:string):void {
    this.emitter.emit(`addToFavorites,${id}`);
  }
}
