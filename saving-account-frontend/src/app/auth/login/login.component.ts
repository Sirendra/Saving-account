import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar:MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (token) => {
          this.authService.setToken(token); // Store JWT in the service
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
