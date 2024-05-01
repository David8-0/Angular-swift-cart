import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProfileComponent } from './components/profile/profile.component';
import{HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { RouterModule, provideRouter} from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { myHttpInterceptor } from './shared/interceptors/my-http.interceptor';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { BadgeModule } from 'primeng/badge';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    SellersComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CategoriesComponent,
    ProfileComponent,
    ProductItemComponent,
    WishlistComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    CarouselModule,
    ScrollPanelModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    MessagesModule,
    CardModule,
    PaginatorModule,
    BadgeModule,
    ConfirmDialogModule,
    RatingModule,
    GalleriaModule,
    ImageModule
  ],
  providers: [provideHttpClient(withInterceptors([
    myHttpInterceptor
  ])),MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
