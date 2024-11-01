import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-historical-context-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoricalContextPageComponent implements OnInit {
  currentEventIndex = 0;

  events = [
    {
      title: '1736 - Leonhard Euler',
      badge: 'Founder of Graph Theory',
      description:
        'The foundation of graph theory was laid by Leonhard Euler in 1736 with the solution to the Seven Bridges of Konigsberg problem. Euler\'s work established the basis for graph theory by formulating the concept of nodes and edges.',
      funFact: 'Euler\'s work on the Seven Bridges problem is considered one of the first examples of topology!',
    },
    {
      title: '1847 - Gustav Kirchhoff',
      badge: 'Applications in Electrical Circuits',
      description:
        'Gustav Kirchhoff applied graph theory to electrical circuits, leading to the formulation of Kirchhoff\'s laws. This demonstrated the practical applications of graph theory beyond theoretical mathematics.',
      funFact: 'Kirchhoff\'s laws are still used today to analyze complex electrical networks.',
    },
    {
      title: '1857 - Arthur Cayley',
      badge: 'Tree Structures',
      description:
        'Arthur Cayley worked on tree structures, which later became foundational for the development of traversal algorithms like Breadth-First Search (BFS) and Depth-First Search (DFS).',
      funFact: 'Cayley also made significant contributions to algebra, particularly in group theory.',
    },
    {
      title: '1950s-1960s - BFS and DFS Formalization',
      badge: 'Graph Traversal Algorithms',
      description:
        'The BFS and DFS algorithms were formalized during the 1950s and 1960s, with computer scientists using these methods for pathfinding and exploring graphs, paving the way for their widespread application in computing.',
      funFact: 'BFS is often used in social networking platforms to find the shortest path between users!',
    },
    {
      title: '1959 - Edsger Dijkstra',
      badge: 'Shortest Path Algorithm',
      description:
        'Edsger Dijkstra introduced the shortest path algorithm, which built on the concepts of graph traversal and is widely used in network routing and geographic information systems.',
      funFact: 'Dijkstra\'s algorithm is the foundation of modern GPS technology!',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.updateBackgroundGradient();
  }

  goToPreviousEvent(): void {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
      this.updateBackgroundGradient();
    }
  }

  goToNextEvent(): void {
    if (this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
      this.updateBackgroundGradient();
    }
  }

  updateBackgroundGradient(): void {
    const colors = [
      'linear-gradient(135deg, #f3e7e9, #e3eeff)',
      'linear-gradient(135deg, #e0f7fa, #ffecb3)',
      'linear-gradient(135deg, #e1f5fe, #e8eaf6)',
      'linear-gradient(135deg, #f0f4c3, #ffecb3)',
      'linear-gradient(135deg, #ffccbc, #ffe0b2)'
    ];
    document.body.style.background = colors[this.currentEventIndex % colors.length];
    document.body.style.transition = 'background 1s ease-in-out';
  }
}
