import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isUserAdmin=false;
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    // this.authService.handleRefresh()
    this.authService.isUserAuthenticated().pipe(
      tap(token => this.isLoggedIn = !!token),
      switchMap(token => {
        if (token) {
          return this.authService.getUserRole();
        }
        return of(false);
      })
    ).subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    });

  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
