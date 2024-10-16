import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false;

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
}
