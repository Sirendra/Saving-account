import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { TellerService } from '../../services/teller.service';
import { Customer } from '../../interface/customer.interface';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  standalone: false,
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent implements OnInit, OnDestroy {
  depositForm: FormGroup;
  customers: Customer[] = [];
  selectedCustomer: any = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private tellerService: TellerService,
    private snackBar: MatSnackBar
  ) {
    this.depositForm = this.fb.group({
      accountNumber: ['', Validators.required],
      customerId: [''],
      amount: [undefined, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.fetchAllCustomers();
  }

  fetchAllCustomers() {
    this.tellerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  onCustomerSelect(customerId: string): void {
    const customer = this.customers.find((c) => c.id === customerId);
    if (customer) {
      this.selectedCustomer = customer;
      this.depositForm.patchValue({ accountNumber: customer.accountNumber });
    }
  }

  onSubmit(): void {
    if (this.depositForm.invalid || !this.selectedCustomer) return;

    const { accountNumber, amount } = this.depositForm.value;

    this.tellerService
      .deposit(accountNumber, amount)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          this.snackBar.open('Deposit failed', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response !== null) {
          this.snackBar.open(response, 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar'],
          });
          this.depositForm.reset();
          this.fetchAllCustomers();
          this.selectedCustomer = null;
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
