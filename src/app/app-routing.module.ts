import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { AuthComponent } from './auth/auth.component';
import { EmpCreateComponent } from './emp/emp-create/emp-create.component';
import { EmpListComponent } from './emp/emp-list/emp-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';*/

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'login', component: AuthComponent },
  //{ path: 'navbar', component: NavbarComponent },
  //{ path: 'create', component: EmpCreateComponent, outlet: 'contenu' },
  //{ path: 'employees', component: EmpListComponent, outlet: 'contenu' },
  //{ path: 'welcome', component: WelcomeComponent, outlet: 'contenu' },
  //{ path: 'logout', component: AuthComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
