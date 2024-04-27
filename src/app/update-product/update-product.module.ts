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
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
@NgModule({
  declarations: [
    UpdateProductComponent,
    EditProductComponent
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
    ToastModule,
    ImageModule,
    RatingModule
  ],
  providers:[MessageService,ConfirmationService]
})
export class UpdateProductModule { }
