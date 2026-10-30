import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';

export const authGuard: CanActivateFn = () =>
  inject(SessionService).usuario() ? true : inject(Router).createUrlTree(['/login']);
