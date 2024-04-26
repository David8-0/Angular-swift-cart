import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  constructor(
    private _productService: ProductService,
    private messageService: MessageService
  ){}
  activeStep:number = 0;
  clickable:boolean = false;
  isLoading:boolean = false;
  productId:string="662c34b16a322b00529989c4";


  productForm:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    price:new FormControl('',[Validators.required]),
    priceDiscount:new FormControl(''),
    description:new FormControl('',[Validators.required]),
    productQuantity:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    brand:new FormControl(''),
  });
  submitProduct(form:FormGroup){
    if(form.valid){
      this.isLoading = true;
      this._productService.addProduct(form.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your Product added Please upload images' });
          this.activeStep=1;
          this.productId=res.data.product._id
          console.log(res);
        },
        error:(err)=>{
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.message}` });
          console.log(err);
        }
      });
    }else{
      console.log(form);
      
    }
  }

  onFilesSelected(event:any){
    const files: File[] = event.target.files;

      if (files.length > 0) {
        let formData = new FormData();
        for(let i = 0;i<files.length;i++){
          formData.append('images',files[i]);
        }
        this._productService.updateProductImagesById(this.productId,formData).subscribe({
          next:(res)=>{
            console.log(res);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Photo updated Successfuly' });
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your photo' });
            console.log(err);
          }
        })
      }
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append('imgCover',file);
        this._productService.updateProductImagesById(this.productId,formData).subscribe({
          next:(res)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your Photo updated Successfuly' });
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was an error updating your photo' });
            console.log(err);
          }
        })
      }
  }

  addAnother(){
    this.activeStep=0;
  }


}
