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
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  SignUp() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      // Call the signup service
      this.authService.signUp(signupData).subscribe(
        (response: any) => {
          this.toastr.success(
            'Sign-up successful! You can now log in.',
            'Success'
          );
          this.router.navigate(['/mainIndex']);
        },
        (error: any) => {
          console.log('Error during sign-up:', error);
          const errorMessage = error?.error?.message || 'Sign-up failed. Please try again.';
          this.toastr.error(errorMessage);
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
    }
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Toggle password visibility
  }

  // Check if email is valid
  checkEmail() {
    // Mark the email control as touched to trigger validation
    this.signupForm.get('email')?.markAsTouched();
  }

  // Method to determine if the email field is invalid
  emailInvalid(): boolean {
    const emailControl = this.signupForm.get('email');
    return emailControl?.touched && emailControl?.invalid ? true : false;
  }
}
