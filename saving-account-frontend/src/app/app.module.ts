import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { TransferComponent } from './account/transfer/transfer.component';
import {TransferConfirmationComponent} from './utils/transfer-confirmation/transfer-confirmation.component';
import { ApprovePersonComponent } from './teller/approve-person/approve-person.component';
import {DepositComponent} from './teller/deposit/deposit.component';
import {MatTableModule} from '@angular/material/table';
import {StatementComponent} from './account/statement/statement.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { SplitDateTimePipe } from './pipe/split-date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    TransferComponent,
    TransferConfirmationComponent,
    ApprovePersonComponent,
    DepositComponent,
    StatementComponent,
    SplitDateTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
