import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private resizeListener: (() => void) | null = null; // Initialize as null
  activeTab: string = 'dfs'; // Default tab is 'dfs'
  showBFSGif: boolean = false; // Default for BFS visualization
  showDFSGif: boolean = false; // Default for DFS visualization
  showDijkstraGif: boolean = false; // Default for Dijkstra visualization

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngAfterViewInit() {
    const openNav = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    if (openNav) {
      openNav.onclick = () => {
        openNav.classList.toggle('active-menu');
        if (navLinks) {
          navLinks.classList.toggle('active-navbar');
        }
      };
    }

    // Add resize event listener
    this.resizeListener = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  private handleResize() {
    const navLinks = document.getElementById('nav-links');
    if (window.innerWidth > 886 && navLinks) {
      navLinks.classList.remove('active-navbar');
    }
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  startBFS() {
    this.showBFSGif = !this.showBFSGif; // Toggle the visibility
    console.log('BFS Started: ', this.showBFSGif); // Debugging
  }

  startDFS() {
    this.showDFSGif = !this.showDFSGif; // Toggle the visibility
    console.log('DFS Started: ', this.showDFSGif); // Debugging
  }

  startDijkstra() {
    this.showDijkstraGif = !this.showDijkstraGif; // Toggle the visibility
    console.log('Dijkstra Started: ', this.showDijkstraGif); // Debugging
  }
}
