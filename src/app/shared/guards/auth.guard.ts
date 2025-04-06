import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs';

export const authGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.user$.pipe(
    take(1),
    map(user => {
      const allowed = !!user;
      if (!allowed)
        router.navigate(['/auth']);
      return allowed;
    })
  )
};
