import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/interfaces/product';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.css'
})
export class SellerProductsComponent implements OnInit,OnDestroy{
    productList:Product[] = [];
    sellerId:string="";
    deleteDialog:boolean = false;
    subToSellerProducts:Subscription|null=null;
    productIdToDelete:string="";
    constructor(
      private _productService:ProductService,
      private _authService:AuthenticationService,
      private messageService: MessageService
    ){
      this.sellerId=_authService.userData.getValue()._id;
      console.log(this.sellerId);
    }
    ngOnInit(): void {
        this.subToSellerProducts=this._productService.getSellerProducts(this.sellerId).subscribe({
          next:(res)=>{
            this.productList=res.data.sellerProducts;
          },
          error:(err)=>{console.log(err);
          }
        });
    }
    ngOnDestroy(): void {
        this.subToSellerProducts?.unsubscribe();
    }
    deleteProduct(){
      this._productService.deleteProductById(this.productIdToDelete).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'your product has been deleted' });
          this.productList = res.data.sellerProducts;
          console.log(this.productList);
        },
        error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there was a problem deleting your product' });
        },
        complete:()=>{
          this.deleteDialog=false;
          this.productIdToDelete = "";
        }
      })
    }
    showDeleteDialog(productId:string){
      this.deleteDialog = true;
      this.productIdToDelete =productId;
    }
    noDelete(){
      this.deleteDialog = false;
      this.productIdToDelete="";
    }
}
