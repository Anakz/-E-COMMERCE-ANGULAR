import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { AuthComponent } from './auth/auth.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { BasketListComponent } from './basket/basket-list/basket-list.component';
import { BasketCreateComponent } from './basket/basket-create/basket-create.component';
import { BasketDetailComponent } from './basket/basket-detail/basket-detail.component';
import { BasketUpdateComponent } from './basket/basket-update/basket-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    AuthComponent,
    SidebarComponent,
    SearchbarComponent,
    BasketListComponent,
    BasketCreateComponent,
    BasketDetailComponent,
    BasketUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
