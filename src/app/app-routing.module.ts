import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { BasketCreateComponent } from './basket/basket-create/basket-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { BasketListComponent } from './basket/basket-list/basket-list.component';
import { BasketDetailComponent } from './basket/basket-detail/basket-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { BillEditComponent } from './bill/bill-edit/bill-edit.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { BillCreateComponent } from './bill/bill-create/bill-create.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentEditComponent } from './payment/payment-edit/payment-edit.component';
import { PaymentDetailComponent } from './payment/payment-detail/payment-detail.component';
import { PaymentCreateComponent } from './payment/payment-create/payment-create.component';
import { DeliveryListComponent } from './delivery/delivery-list/delivery-list.component';
import { DeliveryEditComponent } from './delivery/delivery-edit/delivery-edit.component';
import { DeliveryDetailComponent } from './delivery/delivery-detail/delivery-detail.component';
import { DeliveryCreateComponent } from './delivery/delivery-create/delivery-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { ProductFournisseurComponent } from './product/product-fournisseur/product-fournisseur.component';

const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'login', component: AuthComponent },
  { path: 'navbar', component: NavbarComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-edit', component: ProductEditComponent },
  { path: 'my-products', component: ProductFournisseurComponent },

  { path: 'welcome', component: WelcomeComponent },
  { path: 'logout', component: AuthComponent },

  { path: 'searchbar', component: SearchbarComponent },

  { path: 'basket-list', component: BasketListComponent },
  { path: 'basket-create', component: BasketCreateComponent },
  { path: 'basket-detail', component: BasketDetailComponent },
  
  { path: 'user-list', component: UserListComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: 'user-create', component: UserCreateComponent },
  
  { path: 'category-list', component: CategoryListComponent },
  { path: 'category-edit', component: CategoryEditComponent },
  { path: 'category-detail', component: CategoryDetailComponent },
  { path: 'category-create', component: CategoryCreateComponent },

  { path: 'register', component: UserCreateComponent },
  
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-edit', component: OrderEditComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'order-create', component: OrderCreateComponent },
  
  { path: 'bill-list', component: BillListComponent },
  { path: 'bill-edit', component: BillEditComponent },
  { path: 'bill-detail', component: BillDetailComponent },
  { path: 'bill-create', component: BillCreateComponent },

  { path: 'payment-list', component: PaymentListComponent },
  { path: 'payment-edit', component: PaymentEditComponent },
  { path: 'payment-detail', component: PaymentDetailComponent },
  { path: 'payment-create', component: PaymentCreateComponent },

  { path: 'delivery-list', component: DeliveryListComponent },
  { path: 'delivery-edit', component: DeliveryEditComponent },
  { path: 'delivery-detail', component: DeliveryDetailComponent },
  { path: 'delivery-create', component: DeliveryCreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
