import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  if (token) {
    return true
  }

  router.navigate(['/auth/login']);
  return false;
};
