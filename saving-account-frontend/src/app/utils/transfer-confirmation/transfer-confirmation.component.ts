import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-confirmation',
  standalone: false,
  templateUrl: './transfer-confirmation.component.html',
  styleUrl: './transfer-confirmation.component.css'
})
export class TransferConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<TransferConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
