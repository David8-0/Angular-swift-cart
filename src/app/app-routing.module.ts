import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { EditProductComponent } from './update-product/components/edit-product/edit-product.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"products",component:ProductsComponent},
  {path:"sellers",component:SellersComponent},
  {path:"categories",component:CategoriesComponent},
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"favorites",component:WishlistComponent},
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'updateProduct', loadChildren: () => import('./update-product/update-product.module').then(m => m.UpdateProductModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
