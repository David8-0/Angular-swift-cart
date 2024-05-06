import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  {path:'checkout',component:CheckOutComponent},
  {path:'myorders',component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
