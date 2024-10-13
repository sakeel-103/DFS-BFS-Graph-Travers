import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private resizeListener: (() => void) | null = null; // Initialize as null

  ngAfterViewInit() {
    const openNav = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    if (openNav) {
      openNav.onclick = () => {
        openNav.classList.toggle("active-menu");
        if (navLinks) {
          navLinks.classList.toggle("active-navbar");
        } else {
          console.error('Nav links not found');
        }
      };
    } else {
      console.error('Menu icon not found');
    }

    // Add resize event listener
    this.resizeListener = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  // Function to handle the resize event
  private handleResize() {
    const navLinks = document.getElementById('nav-links');
    if (window.innerWidth > 886 && navLinks) {
      navLinks.classList.remove('active-navbar');
    }
  }

  ngOnDestroy() {
    // Clean up the event listener only if it was set
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}
