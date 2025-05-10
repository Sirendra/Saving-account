import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JwtPayload} from '../interface/JwtPayload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService:AuthService,private snackBar:MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('token');
console.log(token);
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
this.authService.handleRefresh();
    try {
      const { exp, isAdmin } = jwtDecode<JwtPayload>(token);
      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        this.snackBar.open('Token expired. Please login again','Close',{
          duration: 2000,
          panelClass: ['warning-snackbar']
        })
        this.authService.logout();
        return false;
      }

      const requiresAdmin = route.data['requiresAdmin'];

      // If route requires a specific role, validate it
      if (requiresAdmin !== undefined && requiresAdmin !== isAdmin) {
        this.router.navigate(['/my-info']);
        return false;
      }

      return true;
    } catch (e) {
      console.warn('Invalid token:', e);
      this.authService.logout();
      return false;
    }
  }
}
