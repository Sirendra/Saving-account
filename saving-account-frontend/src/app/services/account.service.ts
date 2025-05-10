import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {GenericApiResponse} from '../interface/generic-api-response.interface';
import {Customer} from '../interface/customer.interface';
import {Transaction} from '../interface/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl='/api/customer'
  constructor(private http: HttpClient) { }

  getDashboardInfo(): Observable<Customer> {
    return this.http.get<GenericApiResponse<Customer>>(`${this.apiUrl}/myInfo`).pipe(map(customer=>customer.data));
  }

  requestStatement(month: number, year: number, pin: string): Observable<Transaction[]> {
    return this.http.post<GenericApiResponse<Transaction[]>>(`${this.apiUrl}/statement`, { month, year, pin }).pipe(
      map(response => response.data)
    );
  }
}
