import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../core/services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AutoLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AutoLoginGuard');
    return this.authService.isAuthenticated
      .pipe(
        tap(is => {
          if (is) {
            this.router.navigate(['/dashboard']);
          } else {
            return null;
          }
        }),
        map(is => !is)
      );
  }
}
