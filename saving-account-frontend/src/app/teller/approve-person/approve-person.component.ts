import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { TellerService } from '../../services/teller.service';
import { Person } from '../../interface/person.interface';

@Component({
  selector: 'app-approve-person',
  templateUrl: './approve-person.component.html',
  standalone: false,
  styleUrls: ['./approve-person.component.css'],
})
export class ApprovePersonComponent implements OnInit, OnDestroy {
  pendingPersons: Person[] = [];
  formInputs: { [personId: string]: number } = {};
  private destroy$ = new Subject<void>();

  constructor(
    private tellerService: TellerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.tellerService.getPendingPersons().subscribe((persons: Person[]) => {
      this.pendingPersons = persons;
    });
  }

  approve(personId: string): void {
    const amount = this.formInputs[personId];

    if (amount != null && amount < 1) {
      this.snackBar.open('The initial deposit must 1 THB or more', 'Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.tellerService
      .approvePersonToBeCustomer(personId, amount)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.snackBar.open('Failed to create customer', 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
          return of(null);
        })
      )
      .subscribe((message) => {
        if (message) {
          this.snackBar.open(message, 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar'],
          });
          this.pendingPersons = this.pendingPersons.filter(
            (u) => u.id !== personId
          );
          delete this.formInputs[personId]; // clear input
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
