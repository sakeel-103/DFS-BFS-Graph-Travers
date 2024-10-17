import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule]
})
export class NavbarComponent {
  isDropdownOpen = false;
  constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const dropdown = document.querySelector('.profile-dropdown .dropdown-content');

    // Check if the clicked element is outside the dropdown and the profile image
    if (this.isDropdownOpen && dropdown && !dropdown.contains(targetElement) && !targetElement.closest('.profile-dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  onLogout() {
    // Implement logout logic here
    console.log('User logged out');
  }
// Check if a link is active
isActive(route: string): boolean {
  return this.router.url === route;
}

}
