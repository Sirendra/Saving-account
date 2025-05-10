import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../interface/customer.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  accountInfo: Customer | undefined;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.accountService
      .getDashboardInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => (this.accountInfo = data),
        error: (_err) =>
          this.snackBar.open('Failed to load account info', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          }),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
