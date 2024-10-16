import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css'],
})
export class ContributorsComponent implements OnInit {
  contributors: Contributor[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContributors();
  }

  fetchContributors() {
    this.http
      .get<Contributor[]>('https://api.github.com/repos/sakeel-103/DFS-BFS-Graph-Travers/contributors')
      .subscribe(
        (data) => {
          this.contributors = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching contributors:', error);
          this.loading = false;
        }
      );
  }

  goToProfile(url: string) {
    window.open(url, '_blank');
  }
}
