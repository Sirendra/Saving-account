import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Person } from '../../interface/person.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        citizenId: ['', Validators.required],
        thaiName: ['', Validators.required],
        englishName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        pin: ['', [Validators.required, Validators.maxLength(6)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onPinInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registerForm.get('pin')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { citizenId, thaiName, englishName, email, password, pin } =
        this.registerForm.value;
      this.authService
        .register({
          citizenId,
          thaiName,
          englishName,
          email,
          password,
          pin,
        } as Person)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.snackBar.open('Registration successful', 'Close', {
              duration: 2000,
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['/login']);
          },
          error: () => {
            this.snackBar.open('Registration failed', 'Close', {
              duration: 2000,
              panelClass: ['error-snackbar'],
            });
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
