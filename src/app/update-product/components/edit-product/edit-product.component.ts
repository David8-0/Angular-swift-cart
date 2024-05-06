import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  ratingvalue: number=3;
  productId:string ="";
  isLoading:boolean = false;
  product:Product = {} as Product;
  constructor(private _activatedRoute:ActivatedRoute,
    private _productService:ProductService,
    private messageService: MessageService
  ){}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id')??""; 
    });

    this._productService.getProductById(this.productId).subscribe({
      next:(res)=>{this.product=res.data.product;
        this.productForm.get('name')?.setValue(this.product.name);
        this.productForm.get('price')?.setValue(this.product.price);
        this.productForm.get('priceDiscount')?.setValue(this.product.priceDiscount);
        this.productForm.get('description')?.setValue(this.product.description);
        this.productForm.get('amount')?.setValue(this.product.amount);
        this.productForm.get('category')?.setValue(this.product.category);
        this.productForm.get('brand')?.setValue(this.product.brand);
        this.ratingvalue = this.product.rating;
      },
      error:(err)=>{console.log(err)}

    });
    
    
  }

  productForm:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    price:new FormControl('',[Validators.required]),
    priceDiscount:new FormControl(''),
    description:new FormControl('',[Validators.required]),
    amount:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    brand:new FormControl(''),
  });

  submitProduct(form:FormGroup){
    if(form.valid){
      console.log(form);
      this.isLoading = true;
      this._productService.updateProductById(this.productId,form.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your Product updated successfuly' });
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
}
