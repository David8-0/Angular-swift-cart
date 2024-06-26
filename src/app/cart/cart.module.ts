import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckOutComponent } from './check-out/check-out.component';
import { TrimStringPipe } from './pipes/pipes/trim-string.pipe';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartListComponent } from './cart-list/cart-list.component';
@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CheckOutComponent,
    TrimStringPipe,
    MyOrdersComponent,
    CartListComponent,
    
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule
    
  ],
  providers:[MessageService,ConfirmationService]
})
export class CartModule { }
