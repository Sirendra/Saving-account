import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../../services/transfer.service'; // Import the transfer service
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TransferConfirmationComponent} from '../../utils/transfer-confirmation/transfer-confirmation.component';

@Component({
  selector: 'app-transfer',
  styleUrl: './transfer.component.css',
  standalone: false,
  templateUrl: './transfer.component.html',
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transferService: TransferService, // Inject the transfer service
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.transferForm = this.fb.group({
      recipientAccountNumber: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      message: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.transferForm.valid) {
      const transferData = this.transferForm.value;
      const dialogRef = this.dialog.open(TransferConfirmationComponent, {
        data: transferData,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.transferService.transferMoney(transferData).subscribe({
            next: (response) => {
              console.log('Transfer successful:', response);
              this.snackBar.open(response, 'Close', {
                duration: 2000,
                panelClass: ['success-snackbar'],
              });
              this.router.navigate(['/dashboard']); // Redirect to dashboard
            },
            error: (err) => {
              console.error('Transfer failed:', err);
              this.snackBar.open(err?.error?.message??'Transfer failed','Close',{
                duration: 2000,
                panelClass: ['error-snackbar'],
              })
            }
          });
        }
      })
    }
  }

  onPinInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.transferForm.get('pin')?.setValue(input.value, { emitEvent: false });
  }

  get recipientAccountNumber() {
    return this.transferForm.get('recipientAccountNumber');
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  get message() {
    return this.transferForm.get('message');
  }
}
