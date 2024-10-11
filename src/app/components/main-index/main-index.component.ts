import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-index',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css'],
})
export class MainIndexComponent {
    constructor(private authService: AuthService) {}

    onLogout(): void {
        this.authService.logout(); // Call the logout method from AuthService
    }
}
