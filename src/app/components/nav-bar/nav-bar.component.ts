import { Component } from '@angular/core';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { FavoritesServiceService } from '../../shared/services/favorites-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    cartNumber:number = 0;
    favNumber:number = 0;
    constructor(private _cartService:CartServiceService,private _favService:FavoritesServiceService){
      _cartService.numOfItems.subscribe(
        val=>this.cartNumber = val
    )
    _favService.favoriteItems.subscribe(val=>this.favNumber = val.length)

    }
}
