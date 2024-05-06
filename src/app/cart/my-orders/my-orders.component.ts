import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/interfaces/order';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  userOrders:Order[] = [] as Order[];
  productList:Product[] = [] as Product[];
  listTotalPrice:number = 0;
  constructor(private _orderService:OrderService){}
  ngOnInit(): void {
      this._orderService.getUserOrders().subscribe({
        next:(res)=>{
          this.userOrders = res.data.orders;
          console.log(this.userOrders);
          
        }
      })
  }
  showList(products:Product[],total:number){
    this.productList  = products;
    this.listTotalPrice = total;
  }
}
