import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';

export const loginGuard: CanActivateFn = () =>
  inject(SessionService).usuario() ? inject(Router).createUrlTree(['/pipeline']) : true;
