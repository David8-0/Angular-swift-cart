import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { FavoritesServiceService } from '../../shared/services/favorites-service.service';
import { MessageService } from 'primeng/api';
import { Role, User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  readonly Role = Role;
    cartNumber:number = 0;
    favNumber:number = 0;
    userData:User = {} as User;
    isLoggedIn:boolean = false;
    constructor(private _cartService:CartServiceService,
      private _favService:FavoritesServiceService,
      private _authService:AuthenticationService,
      private messageService: MessageService
    ){
      _cartService.numOfItems.subscribe(val=>this.cartNumber = val);
    _favService.favoriteItems.subscribe(val=>this.favNumber = val.length);
    _authService.userData.subscribe({
      next:(res)=>{
        if(res!=null) this.isLoggedIn = true;
        else this.isLoggedIn = false;
        this.userData = res;
        console.log(this.userData);
      }
    });

    }
    logOut(){
      localStorage.removeItem('token');
      this._authService.userData.next(null);
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Logged Out Successfuly' });
    }
}
