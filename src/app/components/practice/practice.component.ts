import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Question {
  id: number;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class QuestionBankComponent implements OnInit {
  questions: Question[] = [
    { id: 1, title: 'Print Adjacency List', description: 'Generate the adjacency list for a graph and print it.', link: 'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1' },
    { id: 2, title: 'BFS of Graph', description: 'Traverse the graph using Breadth-First Search (BFS) and return the traversal order.', link: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1' },
    { id: 3, title: 'DFS of Graph', description: 'Traverse the graph using Depth-First Search (DFS) and return the traversal order.', link: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1' },
    { id: 4, title: 'Transitive Closure of a Graph', description: 'Calculate the transitive closure of a given graph.', link: 'https://www.geeksforgeeks.org/problems/transitive-closure-of-a-graph0930/1/' },
    { id: 5, title: 'Union-Find', description: 'Implement the union-find algorithm to detect disjoint sets.', link: 'https://www.geeksforgeeks.org/problems/union-find/1/' },
    { id: 6, title: 'Detect Cycle using DSU', description: 'Detect a cycle in a graph using the Disjoint Set Union (DSU) approach.', link: 'https://www.geeksforgeeks.org/problems/detect-cycle-using-dsu/1/' },
    { id: 7, title: 'Connected Components in an Undirected', description: 'Find all connected components in an undirected graph.', link: 'https://www.geeksforgeeks.org/problems/number-of-provinces/1/' },
    { id: 8, title: 'Find the number of islands', description: 'Find the number of islands in a given 2D grid.', link: 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1/' },
    { id: 9, title: 'Detect cycle in an undirected graph', description: 'Detect if there is a cycle in an undirected graph.', link: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1/' },
    { id: 10, title: 'Hamiltonian Path', description: 'Find if there is a Hamiltonian path in the graph.', link: 'https://www.geeksforgeeks.org/top-50-graph-coding-problems-for-interviews/#:~:text=Hamiltonian%20Path-,Solve,-Prerequisite%20Tasks' },
    { id: 11, title: 'Prerequisite Tasks', description: 'Determine if prerequisite tasks can be completed in the given order.', link: 'https://www.geeksforgeeks.org/top-50-graph-coding-problems-for-interviews/#:~:text=Prerequisite%20Tasks-,Solve,-Course%20Schedule' },
    { id: 12, title: 'Course Schedule', description: 'Determine if it is possible to finish all courses given the prerequisites.', link: 'https://www.geeksforgeeks.org/problems/course-schedule/1/#' },
    { id: 13, title: 'Circle of Strings', description: 'Check if the given strings can form a circle.', link: 'https://www.geeksforgeeks.org/problems/circle-of-strings4530/1' }
  ];
  filteredQuestions: Question[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.filteredQuestions = this.questions;
  }

  filterQuestions() {
    this.filteredQuestions = this.questions.filter(question =>
      question.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
