import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../../shared/services/product.service';

interface PageEvent  {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  defaultSrc:string='';
  data:Product[] = [];
  first: number = 0;

  rows: number = 10;
  constructor(
    private _authService : AuthenticationService,
    private _productService: ProductService
  ){}

  ngOnInit(): void {
    this._productService.getProducts(6,1).subscribe({
      next:(data)=>{
        console.log(data.data.products);
        this.data = data.data.products;
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  addToCart(id:string){
    
  }

  deleteProduct(id:string){
    this._productService.deleteProductById(id).subscribe({
      next:(data)=>{console.log(data);},
      error:(err)=>console.log(err),
    })
  }

  onPageChange(event: PageEvent ) {
      this.first = event.first;
      this.rows = event.rows;
  }

}
