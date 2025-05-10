import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {GenericApiResponse} from '../interface/generic-api-response.interface';
import {Person} from '../interface/person.interface';

export interface DecodedToken {
  sub: string;
  isAdmin: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api/auth'; // Update with your Spring Boot API URL
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router:Router) {}

  login(email: string, password: string): Observable<string> {
    const loginData = { email, password };
    return this.http.post<GenericApiResponse<{ token: string }>>(`${this.apiUrl}/login`, loginData).pipe(map(response=>response?.data?.token));
  }

  register(data: Person) {
    return this.http.post('/api/auth/register', data);
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token$.next(token);
    this.publishRole();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.token$.next(null);
    this.isAdmin$.next(false);
    this.router.navigate(['/login']);
  }

  isUserAuthenticated():Observable<string|null>{
   return this.token$.asObservable()
  }

  handleRefresh(){
    const token=localStorage.getItem('token');
    const isAdmin=localStorage.getItem('isAdmin');
    if(!token)this.logout()
    else{
      this.token$.next(token);
      this.isAdmin$.next(isAdmin!== 'false');
    }

  }

  getUserRole():Observable<boolean>{
   return this.isAdmin$.asObservable()
  }

  publishRole(): void{
    const token = localStorage.getItem('token');
    if (token){
      try {
        const decoded: DecodedToken = jwtDecode(token);
        localStorage.setItem('isAdmin', decoded.isAdmin);
        this.isAdmin$.next(decoded.isAdmin !== 'false');
      } catch (e) {
        this.isAdmin$.next(false);
      }
    }

  }
}
