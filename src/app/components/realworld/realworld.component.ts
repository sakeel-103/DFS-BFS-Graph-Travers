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
      description: 'Graph algorithms analyze social networks, where nodes represent individuals and edges represent relationships or interactions.',
      icon: '👥',
      category: 'Technology',
      details: [
        'Use algorithms like BFS and DFS to explore connections',
        'Identify influential users using centrality algorithms',
        'Detect communities through clustering algorithms'
      ]
    },
    {
      id: 2,
      title: 'Transportation Systems',
      description: 'Graphs model road networks, flight paths, and public transit systems, with algorithms optimizing routes and traffic flow.',
      icon: '🚗',
      category: 'Infrastructure',
      details: [
        'Apply Dijkstra’s algorithm for shortest path finding',
        'Use Floyd-Warshall for all-pairs shortest paths in network analysis',
        'Optimize traffic flow with minimum spanning tree algorithms'
      ]
    },
    {
      id: 3,
      title: 'Computer Networks',
      description: 'Network routing algorithms utilize graph theory to manage data flow in computer networks.',
      icon: '💻',
      category: 'Technology',
      details: [
        'Implement Dijkstra’s algorithm for efficient packet routing',
        'Use Bellman-Ford for networks with negative weights',
        'Analyze network resilience and redundancy with connectivity algorithms'
      ]
    },
    {
      id: 4,
      title: 'Web Crawling',
      description: 'Graph traversal algorithms help search engines efficiently crawl web pages and index content.',
      icon: '🌐',
      category: 'Technology',
      details: [
        'Use BFS for level-order web crawling',
        'Prioritize high-value sites with DFS-based techniques',
        'Identify page ranking through graph-based link analysis algorithms'
      ]
    },
    {
      id: 5,
      title: 'Scheduling and Task Dependency',
      description: 'Graphs represent tasks and dependencies in scheduling applications, ensuring efficient task management.',
      icon: '📅',
      category: 'Management',
      details: [
        'Use topological sorting for task ordering in dependency graphs',
        'Detect circular dependencies with cycle detection algorithms',
        'Optimize task scheduling with DAG (Directed Acyclic Graph) structures'
      ]
    },
    {
      id: 6,
      title: 'Game Development',
      description: 'Graphs are used to model game maps, paths, and character movements in gaming algorithms.',
      icon: '🎮',
      category: 'Entertainment',
      details: [
        'Implement A* algorithm for pathfinding in open-world games',
        'Design maze generation and traversal with DFS and BFS',
        'Model game states and transitions with graph-based structures'
      ]
    }
    
  ];

  categories: string[] = ['All', 'Technology', 'Infrastructure', 'Management','Entertainment'];
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
