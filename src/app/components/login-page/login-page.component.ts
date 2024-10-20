import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  passwordVisible = false;
  username = ''; // Declare username
  password = ''; // Declare password

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  login(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }

    const { username, password } = form.value;
    console.log('form values:', form.value);

    this.authService.login({ username, password }).subscribe(
      (response: any) => {
        // Handle successful login
        this.toastr.success('Login Successful', 'Success');
        this.router.navigate(['/mainIndex']); // Navigate upon successful login
      },
      (error: any) => {
        // Handle login error
        console.log('Login failed', error);
        this.toastr.error('Invalid username or password', 'Error');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/signup']); // Navigate back to the signup page
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; // Toggle the password visibility
  }

  loginWithGoogle(): void {
    // Placeholder for future Google authentication integration
    console.log('Google login initiated');
    this.toastr.success('Google login successful', 'Success');
  }
}
