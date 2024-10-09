import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private toastr:ToastrService,
  ) {}

  login(form: NgForm): void {
    const { username, password } = form.value;
    const isSuccess = this.authenticate(username, password);
    console.log("username", username,"pass", password)
    if (isSuccess) {
      this.toastr.success("Login Successfully",'Success')
      // this.router.navigate(['/main-index']);
    } else {
      console.error('Login failed');
      this.toastr.error("Invalid username or password",'Error')
    }
  }

  private authenticate(username: string, password: string): boolean {
    return username === 'test' && password === 'password';
  }

  goBack() {
    this.router.navigate(['/signup']); // Navigate back to the signup page
  }
}
