import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';  // Import environment

declare var gapi: any;

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],  // Ensure CommonModule is imported
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  passwordVisible = false;
  username = ''; // Declare username
  password = ''; // Declare password

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadGoogleSignIn();
  }

  loadGoogleSignIn(): void {
    if (typeof gapi !== 'undefined') {
      this.initializeGoogleAuth();
    } else {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.initializeGoogleAuth();
      };
      document.head.appendChild(script);
    }
  }

  initializeGoogleAuth(): void {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: environment.CLIENT_ID, // Replace with your actual Google Client ID
        cookiepolicy: 'single_host_origin',
      });

      const googleSignInButton = document.getElementById('google-signin-btn');
      if (googleSignInButton) {
        auth2.attachClickHandler(
          googleSignInButton,
          {},
          (googleUser: any) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.authService.loginWithGoogle(id_token).subscribe(
              (response: any) => {
                this.toastr.success('Google Login Successful', 'Success');
                this.router.navigate(['/mainIndex']);
              },
              (error: any) => {
                console.log('Google login failed', error);
                this.toastr.error('Google login failed', 'Error');
              }
            );
          },
          (error: any) => {
            console.log('Google login error:', error);
            this.toastr.error('Google login failed', 'Error');
          }
        );
      } else {
        console.error('Google Sign-In button not found');
      }
    });
  }

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
    this.passwordVisible = !this.passwordVisible;
  }
}
