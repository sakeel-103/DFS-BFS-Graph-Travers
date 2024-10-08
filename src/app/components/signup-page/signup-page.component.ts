import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr:ToastrService,
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
        this.toastr.error("User already exists. Please use a different email.",'error')
        return;
      }

      users.push(signupData);
      localStorage.setItem('users', JSON.stringify(users));

      this.toastr.success("Sign-up successful! You can now log in.",'Success')
      
      this.authService.signUp(signupData).subscribe(
        (response: any) => {
          console.log('Sign-up successful with API!', response);
          this.router.navigate(['/main-index']);
        },
        (error: any) => {
          console.error('Error during sign-up:', error);
          this.toastr.error("Sign-up failed. Please try again.",'error')
        }
      );
    } else {
      this.toastr.error("Please fill out the form correctly.",'error')
    }
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    // Navigate to the home page
    this.router.navigate(['/']); // Change this to your desired route for home page
  }
}
