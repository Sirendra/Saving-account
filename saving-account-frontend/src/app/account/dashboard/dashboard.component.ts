import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Customer} from '../../interface/customer.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  accountInfo: Customer|undefined;

  constructor(private accountService: AccountService,private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.accountService.getDashboardInfo().subscribe({
      next: (data) => this.accountInfo = data,
      error: (err) => this.snackBar.open('Failed to load account info','Close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
      })
    });
  }
}
