import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.BACKEND_API_URL;
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
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(tap(() => {
      // On successful login, you could manage user session here if needed
    }));
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        // Clear any user info from storage (if applicable)
        this.router.navigate(['/login']); // Redirect to login page after logout
      },
      error: (error) => {
        console.error('Error logging out:', error);
      }
    });
  }

  fetchAllUsers(): void {
    this.getAllUsers().subscribe({
      next: (res: any) => {
        this.userList = res;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
