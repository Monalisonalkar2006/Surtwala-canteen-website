import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../constants/role.constants';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route: ActivatedRouteSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.currentUser();
    if (!user) { router.navigate(['/auth/login']); return false; }
    if (allowedRoles.includes(user.role as UserRole)) return true;
    router.navigate(['/auth/login']);
    return false;
  };
};
