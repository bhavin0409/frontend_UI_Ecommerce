import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  const role = authService.getUserRole();
  
  if (role === 'Admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};