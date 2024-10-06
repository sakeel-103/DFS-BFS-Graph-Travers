import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  login(form: NgForm): void {
    const { username, password } = form.value;
    const isSuccess = this.authenticate(username, password);

    if (isSuccess) {
      this.router.navigate(['/main-index']);
    } else {
      console.error('Login failed');
      alert('Invalid username or password');
    }
  }

  private authenticate(username: string, password: string): boolean {
    // Hardcoded credentials check
    if (username === 'test' && password === 'password') {
      return true;
    }
  
    // Check localStorage for 'users' array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
 
    // Iterate through users array and check for matching credentials
    for (const user of users) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    // If no match is found, return false
    return false;
  }
}
