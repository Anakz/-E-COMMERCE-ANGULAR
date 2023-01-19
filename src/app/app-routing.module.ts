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

const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'login', component: AuthComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'logout', component: AuthComponent },
  { path: 'searchbar', component: SearchbarComponent },
  { path: 'basket-create', component: BasketCreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
