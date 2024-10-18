import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule,FormsModule,RouterModule]
})
export class LoginPageComponent {
  passwordVisible: boolean = false;
  loginData = { username: '', password: '' };

  constructor(private router: Router, private toastr: ToastrService) {}

  login(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Please fill in valid credentials.', 'Validation Error');
      return;
    }
    else{
      this.router.navigate(['/mainIndex']);
    }

   
   

    
  }

  

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  goBack() {
    this.router.navigate(['/signup']);
  }

  loginWithGoogle(): void {
    console.log('Google login initiated');
    this.toastr.success('Google login successful', 'Success');
  }
}
