import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  userList: any;

  constructor(private http: HttpClient) {}

  signUp(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
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
