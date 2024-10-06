import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  userList: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(tap((response: any) => {
        localStorage.setItem('authToken', response.token);
    }));
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).pipe(
        tap(() => {
          // Remove the token from local storage after logging out
          localStorage.removeItem('authToken');
        })
      );
    localStorage.removeItem('authToken'); // Remove the token
    this.router.navigate(['/login']); // Redirect to login page
  }

  fetchAllUsers(): void {
    this.getAllUsers().subscribe(
      (res: any) => {
        this.userList = res;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
