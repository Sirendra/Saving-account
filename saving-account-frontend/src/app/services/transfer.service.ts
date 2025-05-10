import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {GenericApiResponse} from '../interface/generic-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TransferService {

  constructor(private http: HttpClient) {}

  transferMoney(transferData: any): Observable<string> {
    return this.http.post<GenericApiResponse<any>>('/api/customer/transfer', transferData).pipe(map(response=>response.message));
  }
}
