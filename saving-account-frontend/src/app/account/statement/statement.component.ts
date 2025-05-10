import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  standalone: false,
  styleUrls: ['./statement.component.css'],
})
export class StatementComponent implements OnDestroy {
  statementForm: FormGroup;
  statementData: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {
    this.statementForm = this.fb.group({
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: ['', [Validators.required, Validators.min(2000)]],
      pin: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.statementForm.invalid) return;

    const { month, year, pin } = this.statementForm.value;

    this.accountService
      .requestStatement(month, year, pin)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          this.snackBar.open('Invalid request or PIN', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
          return of([]);
        })
      )
      .subscribe((data) => {
        this.statementData = data;
        if (data.length === 0) {
          this.snackBar.open(
            'No transactions found for selected period.',
            'Close',
            {
              duration: 2000,
              panelClass: ['warning-snackbar'],
            }
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
