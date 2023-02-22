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
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { BillEditComponent } from './bill/bill-edit/bill-edit.component';
import { BillCreateComponent } from './bill/bill-create/bill-create.component';
import { DeliveryListComponent } from './delivery/delivery-list/delivery-list.component';
import { DeliveryDetailComponent } from './delivery/delivery-detail/delivery-detail.component';
import { DeliveryEditComponent } from './delivery/delivery-edit/delivery-edit.component';
import { DeliveryCreateComponent } from './delivery/delivery-create/delivery-create.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentDetailComponent } from './payment/payment-detail/payment-detail.component';
import { PaymentEditComponent } from './payment/payment-edit/payment-edit.component';
import { PaymentCreateComponent } from './payment/payment-create/payment-create.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductFournisseurComponent } from './product/product-fournisseur/product-fournisseur.component';
import { FooterComponent } from './footer/footer.component';
  

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
    BasketUpdateComponent,
    ProductEditComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    UserDetailComponent,
    BillListComponent,
    BillDetailComponent,
    BillEditComponent,
    BillCreateComponent,
    DeliveryListComponent,
    DeliveryDetailComponent,
    DeliveryEditComponent,
    DeliveryCreateComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderEditComponent,
    OrderCreateComponent,
    PaymentListComponent,
    PaymentDetailComponent,
    PaymentEditComponent,
    PaymentCreateComponent,
    CategoryCreateComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ProductFournisseurComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
