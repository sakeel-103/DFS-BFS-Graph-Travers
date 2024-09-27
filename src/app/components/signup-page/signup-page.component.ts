import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  imports: [RouterModule, ReactiveFormsModule],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with validation
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  SignUp() {
    const signupData = this.signupForm.value;
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      const localusers = localStorage.getItem('users');
      let users: any[] = localusers ? JSON.parse(localusers) : [];

      const existingUser = users.find(
        (user) => user.email === signupData.email
      );
      if (existingUser) {
        alert('User already exists. Please use a different email.');
        return;
      }

      users.push(signupData);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Sign-up successful! You can now log in.');
      this.authService.signUp(signupData).subscribe(
        (response: any) => {
          console.log('Sign-up successful with API!', response);
          this.router.navigate(['/main-index']);
        },
        (error: any) => {
          console.error('Error during sign-up:', error);
          alert('Sign-up failed. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  openLogin() {
    this.router.navigate(['/login']);
  }
}
