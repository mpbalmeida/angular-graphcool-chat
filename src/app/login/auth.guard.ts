import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {LoginRoutingModule} from './login-routing.module';
import {AuthService} from '../core/services/auth.service';
import {take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: LoginRoutingModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): Observable<boolean> {
    // caso route.path nao funcione usar windows.location.pathname
    return this.checkAuthState(route.path)
      .pipe(take(1));
  }

  private checkAuthState(url: string): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(
        tap( is => {
          if (!is) {
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
