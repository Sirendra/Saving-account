import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {GenericApiResponse} from '../interface/generic-api-response.interface';
import {Person} from '../interface/person.interface';
import {Customer} from '../interface/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class TellerService {

  private apiUrl = '/api/teller';

  constructor(private http: HttpClient) {}

  // Fetch list of persons
  getPendingPersons(): Observable<Person[]> {
    return this.http.get<GenericApiResponse<Person[]>>(`${this.apiUrl}/persons`).pipe(map(response=>response.data));
  }

  // Approve a user to become a customer
  approvePersonToBeCustomer(personId: string,initialDeposit?:number): Observable<string> {
    return this.http.post<GenericApiResponse<any>>(`${this.apiUrl}/create-account`, {personId,initialDeposit}).pipe(map(response=>response.message));
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<GenericApiResponse<Customer[]>>(`${this.apiUrl}/customers`).pipe(map(response=>response.data));
  }

  deposit(accountNumber: string, amount: number): Observable<string> {
    return this.http.post<GenericApiResponse<any>>(`${this.apiUrl}/deposit`, { accountNumber,amount }).pipe(map(response=>response.message));
  }
}
