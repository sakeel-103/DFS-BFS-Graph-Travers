import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Application {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  details: string[];
}

@Component({
  selector: 'app-graph-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './realworld.component.html',
  styleUrls: ['./realworld.component.css']
})
export class RealworldComponent implements OnInit {
  applications: Application[] = [
    {
      id: 1,
      title: 'Social Networks',
      description: 'Graph theory is used to analyze social networks, where nodes represent individuals and edges represent relationships or interactions.',
      icon: '👥',
      category: 'Technology',
      details: [
        'Identify influential users or communities',
        'Analyze information spread and viral content',
        'Detect patterns in user behavior and connections'
      ]
    },
    {
      id: 2,
      title: 'Transportation Systems',
      description: 'Graphs model road networks, flight paths, and public transit systems, optimizing routes and traffic flow.',
      icon: '🚗',
      category: 'Infrastructure',
      details: [
        'Optimize traffic light timing',
        'Plan efficient public transportation routes',
        'Analyze and improve road network connectivity'
      ]
    },
    {
      id: 3,
      title: 'Computer Networks',
      description: 'Network topologies and data routing algorithms rely heavily on graph theory concepts.',
      icon: '💻',
      category: 'Technology',
      details: [
        'Design efficient network architectures',
        'Implement routing protocols',
        'Analyze network vulnerability and security'
      ]
    }
  ];

  categories: string[] = ['All', 'Technology', 'Infrastructure'];
  selectedCategory: string = 'All';
  searchTerm: string = '';

  ngOnInit() {
    this.shuffleApplications();
  }

  shuffleApplications() {
    for (let i = this.applications.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.applications[i], this.applications[j]] = [this.applications[j], this.applications[i]];
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredApplications() {
    return this.applications.filter(app => 
      (this.selectedCategory === 'All' || app.category === this.selectedCategory) &&
      (app.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
       app.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
