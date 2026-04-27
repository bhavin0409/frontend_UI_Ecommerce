import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductsComponent } from './Pages/products/products.component';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { EditProductComponent } from './Pages/edit-product/edit-product.component';
import { UsersComponent } from './Pages/users/users.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { OrderComponent } from './Pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component:AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
