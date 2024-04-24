import { Component } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { FavoritesServiceService } from '../../shared/services/favorites-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  data:Product[] = [];
  tmpData:Product[] = [];
  mode:string="wishlist";
  constructor(private _favoritesService: FavoritesServiceService){
    _favoritesService.favoriteItems.subscribe(favs=>{
      this.tmpData=favs;
      this.tmpData.forEach(item=>item.isfavorite=true);
      this.data=this.tmpData;
    })
  }

  addToFavorites(productId:string){
    this._favoritesService.add(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  removeFromFavorites(productId:string){
    this._favoritesService.remove(productId).subscribe({
      next:(res)=>{
        this._favoritesService.favoriteItems.next(res.data.favorites);
      },
      error:(err)=>console.log(err),
      complete:()=>console.log("Done") 
    });
  }

  recData(data:string){
    let arr = data.split(',');
    switch(arr[0]){
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
}
