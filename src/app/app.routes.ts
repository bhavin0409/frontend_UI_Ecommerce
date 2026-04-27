import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard'; 
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { OrderComponent } from './shared/components/order/order.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => 
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module')
        .then(m => m.ProductModule)
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module')
        .then(m => m.CartModule),
    canActivate: [authGuard]
  },

  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module')
        .then(m => m.AdminModule),
    canActivate: [adminGuard]
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

];
