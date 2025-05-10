import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import {DashboardComponent} from './account/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import {TransferComponent} from './account/transfer/transfer.component';
import {DepositComponent} from './teller/deposit/deposit.component';
import {ApprovePersonComponent} from './teller/approve-person/approve-person.component';
import {StatementComponent} from './account/statement/statement.component';
import {RegisterComponent} from './auth/register/register.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard],data: { requiresAdmin: false } },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }
  },
  {
    path: 'approve',
    component: ApprovePersonComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }
  },
  {
    path: 'statement',
    component: StatementComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: false }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class AppRoutingModule { }
