import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductComponent } from './update-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';

const routes: Routes = [{ path: '', component: UpdateProductComponent },
{path:'edit-product/:id', component: EditProductComponent},
{path:'seller-products',component:SellerProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProductRoutingModule { }
