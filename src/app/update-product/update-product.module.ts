import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ToastModule
  ],
  providers:[MessageService,ConfirmationService]
})
export class UpdateProductModule { }
