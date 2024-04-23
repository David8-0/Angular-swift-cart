import { Component } from '@angular/core';
import { CartServiceService } from '../../shared/services/cart-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    cartNumber:number = 0;
    constructor(private _cartService:CartServiceService){
      _cartService.numOfItems.subscribe(
        val=>this.cartNumber = val
    )
    }
}
