import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Question {
  id: number;
  title: string;
  description: string;
  link: string;
  level:string;
}

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class QuestionBankComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      title: 'Print Adjacency List',
      description: 'Generate the adjacency list for a graph and print it.',
      link: 'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1',
      level: 'Easy',
    },
    {
      id: 2,
      title: 'BFS of Graph',
      description:
        'Traverse the graph using Breadth-First Search (BFS) and return the traversal order.',
      link: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1',
      level: 'Easy',
    },
    {
      id: 3,
      title: 'DFS of Graph',
      description:
        'Traverse the graph using Depth-First Search (DFS) and return the traversal order.',
      link: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1',
      level: 'Easy',
    },
    {
      id: 4,
      title: 'Transitive Closure of a Graph',
      description: 'Calculate the transitive closure of a given graph.',
      link: 'https://www.geeksforgeeks.org/problems/transitive-closure-of-a-graph0930/1/',
      level: 'Medium',
    },
    {
      id: 5,
      title: 'Union-Find',
      description:
        'Implement the union-find algorithm to detect disjoint sets.',
      link: 'https://www.geeksforgeeks.org/problems/union-find/1/',
      level: 'Medium',
    },
    {
      id: 6,
      title: 'Detect Cycle using DSU',
      description:
        'Detect a cycle in a graph using the Disjoint Set Union (DSU) approach.',
      link: 'https://www.geeksforgeeks.org/problems/detect-cycle-using-dsu/1/',
      level: 'Medium',
    },
    {
      id: 7,
      title: 'Connected Components in an Undirected Graph',
      description: 'Find all connected components in an undirected graph.',
      link: 'https://www.geeksforgeeks.org/problems/number-of-provinces/1/',
      level: 'Medium',
    },
    {
      id: 8,
      title: 'Find the number of islands',
      description: 'Find the number of islands in a given 2D grid.',
      link: 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1/',
      level: 'Medium',
    },
    {
      id: 9,
      title: 'Detect cycle in an undirected graph',
      description: 'Detect if there is a cycle in an undirected graph.',
      link: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1/',
      level: 'Medium',
    },
    {
      id: 10,
      title: 'Hamiltonian Path',
      description: 'Find if there is a Hamiltonian path in the graph.',
      link: 'https://www.geeksforgeeks.org/top-50-graph-coding-problems-for-interviews/#:~:text=Hamiltonian%20Path-,Solve,-Prerequisite%20Tasks',
      level: 'Hard',
    },
    {
      id: 11,
      title: 'Prerequisite Tasks',
      description:
        'Determine if prerequisite tasks can be completed in the given order.',
      link: 'https://www.geeksforgeeks.org/top-50-graph-coding-problems-for-interviews/#:~:text=Prerequisite%20Tasks-,Solve,-Course%20Schedule',
      level: 'Hard',
    },
    {
      id: 12,
      title: 'Course Schedule',
      description:
        'Determine if it is possible to finish all courses given the prerequisites.',
      link: 'https://www.geeksforgeeks.org/problems/course-schedule/1/#',
      level: 'Hard',
    },
    {
      id: 13,
      title: 'Circle of Strings',
      description: 'Check if the given strings can form a circle.',
      link: 'https://www.geeksforgeeks.org/problems/circle-of-strings4530/1',
      level: 'Medium',
    },
    {
      id: 14,
      title: 'Shortest Path in a Weighted Graph',
      description:
        'Find the shortest path from a source to all vertices in a weighted graph.',
      link: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-2/',
      level: 'Hard',
    },
    {
      id: 15,
      title: 'Kruskal’s Algorithm',
      description:
        'Implement Kruskal’s algorithm to find the Minimum Spanning Tree (MST) of a graph.',
      link: 'https://www.geeksforgeeks.org/kruskals-algorithm-greedy-2/',
      level: 'Hard',
    },
    {
      id: 16,
      title: 'Prim’s Algorithm',
      description:
        'Implement Prim’s algorithm to find the Minimum Spanning Tree (MST) of a graph.',
      link: 'https://www.geeksforgeeks.org/prims-minimum-spanning-tree-algorithm-using-priority-queue/',
      level: 'Hard',
    },
    {
      id: 17,
      title: 'Topological Sort',
      description:
        'Perform a topological sort on a Directed Acyclic Graph (DAG).',
      link: 'https://www.geeksforgeeks.org/problems/topological-sort/1?itm_source=geeksforgeeks&itm_medium=article&itm_campaign=practice_card',
      level: 'Medium',
    },
    {
      id: 18,
      title: 'Minimum Distance between two nodes in a BST',
      description:
        'Find the minimum distance between two nodes in a Binary Search Tree (BST).',
      link: 'https://www.geeksforgeeks.org/minimum-distance-between-two-nodes-of-a-bst/',
      level: 'Medium',
    },
    {
      id: 19,
      title: 'Shortest Path in an Unweighted Graph',
      description:
        'Find the shortest path between two nodes in an unweighted graph using BFS.',
      link: 'https://www.geeksforgeeks.org/shortest-path-in-a-binary-matrix/',
      level: 'Easy',
    },
    {
      id: 20,
      title: 'Flood Fill Algorithm',
      description: 'Implement the flood fill algorithm for a given grid.',
      link: 'https://www.geeksforgeeks.org/flood-fill-algorithm-implement-using-recursion/',
      level: 'Easy',
    },
    {
      id: 21,
      title: 'Longest Path in a Directed Acyclic Graph',
      description: 'Find the longest path in a Directed Acyclic Graph (DAG).',
      link: 'https://www.geeksforgeeks.org/longest-path-directed-acyclic-graph/',
      level: 'Hard',
    },
    {
      id: 22,
      title: 'Articulation Points in a Graph',
      description: 'Find all articulation points (or cut vertices) in a graph.',
      link: 'https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/',
      level: 'Medium',
    },
    {
      id: 23,
      title: 'Bridges in a Graph',
      description: 'Find all bridges (or cut edges) in a graph.',
      link: 'https://www.geeksforgeeks.org/bridge-in-a-graph/',
      level: 'Medium',
    },
    {
      id: 24,
      title: 'Cycle Detection in Directed Graph',
      description: 'Detect if a directed graph contains a cycle.',
      link: 'https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph-using-dfs/',
      level: 'Medium',
    },
    {
      id: 25,
      title: 'Maximum Flow in a Flow Network',
      description:
        'Calculate the maximum flow in a flow network using the Ford-Fulkerson method.',
      link: 'https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/',
      level: 'Hard',
    },
  ];

  filteredQuestions: Question[] = [];
  searchTerm: string = '';
  isLoading: boolean = false; // Loading state variable
  selectedCategory: string = '';

  ngOnInit(): void {
    this.filteredQuestions = this.questions;
  }

  filterQuestions() {
    this.isLoading = true; // Set loading to true
    setTimeout(() => {
      this.filteredQuestions = this.questions.filter(
        (question) =>
          (this.selectedCategory === '' ||
            question.level === this.selectedCategory) && // Filter by category
          (question.title
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
            question.description
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()))
      );
      this.isLoading = false;
    }, 500);
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.filterQuestions(); // Re-filter questions when category changes
  }
}