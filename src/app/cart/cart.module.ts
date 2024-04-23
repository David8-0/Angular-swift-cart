import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './cart-item/cart-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    DropdownModule,
    InputNumberModule,
    FormsModule
    
  ]
})
export class CartModule { }
