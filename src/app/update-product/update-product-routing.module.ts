import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductComponent } from './update-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [{ path: '', component: UpdateProductComponent },
{path:'edit-product/:id', component: EditProductComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProductRoutingModule { }
