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
    return username === 'test' && password === 'password';
  }
}
