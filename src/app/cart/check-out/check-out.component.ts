import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../shared/services/cart-service.service';
import { Product } from '../../shared/interfaces/product';
import { Cart } from '../../shared/interfaces/cart';
import { OrderService } from '../../shared/services/order.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  cart:Cart = {} as Cart;
  orderDone: boolean = false;
  constructor(
    private _cartService:CartServiceService,
    private _orderService:OrderService,
    private messageService: MessageService,
    private _router:Router

  ){}
  ngOnInit(): void {
      this._cartService.getCart().subscribe({
        next:(res)=>{
          this.cart =res.data.cart;
          console.log(this.cart);
        },
        error:(err)=>console.log(err),
      });
  }

  confirmOrder(){
    this._orderService.createOrder().subscribe({
      next:(res)=>{
        this._cartService.cartItems.next({} as Cart);
        this._cartService.numOfItems.next(0);  
        this.orderDone = true;
        setTimeout(() => {
          this._router.navigate(['/home']);
        }, 4000);
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem confirming your order please contact customer support' });
        console.log(err);
        
      },
    });
  }
}
