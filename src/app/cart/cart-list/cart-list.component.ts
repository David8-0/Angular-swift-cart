import { Component, Input } from '@angular/core';
import { Cart } from '../../shared/interfaces/cart';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  @Input() data:Product[] = [] as Product[];
  @Input() totalPrice:number = 0;
}
