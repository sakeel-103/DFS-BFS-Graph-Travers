import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.BACKEND_API_URL;
  userList: any[] = []; // Initialize userList as an empty array

  constructor(private http: HttpClient, private router: Router) {}

  signUp(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap(() => {
        // Handle successful login (e.g., manage user session)
      })
    );
  }
  // Login with Google (send the ID token to backend for verification)
  loginWithGoogle(idToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`, // Send the Google ID token to the backend
    });

    return this.http.post(`${this.apiUrl}/auth/google`, { token: idToken }, { headers });
  }

  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, contactData); // Ensure correct endpoint
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
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
      next: (res: any[]) => {
        this.userList = res; // Ensure userList is assigned properly
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
