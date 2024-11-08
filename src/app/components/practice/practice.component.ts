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
    {
      id: 26,
      title: 'Graph Representation using Adjacency Matrix',
      description: 'Implement the representation of a graph using an adjacency matrix.',
      link: 'https://www.geeksforgeeks.org/graph-representation-using-adjacency-matrix/',
      level: 'Easy',
    },
    {
      id: 27,
      title: 'Detect Negative Cycle in a Graph',
      description: 'Check if a graph contains a negative weight cycle using Bellman-Ford algorithm.',
      link: 'https://www.geeksforgeeks.org/detect-negative-cycle-bellman-ford-algorithm/',
      level: 'Medium',
    },
    {
      id: 28,
      title: 'Graph Coloring Problem',
      description: 'Determine the minimum number of colors required to color a graph such that no two adjacent vertices have the same color.',
      link: 'https://www.geeksforgeeks.org/graph-coloring/',
      level: 'Medium',
    },
    {
      id: 29,
      title: 'Dijkstra’s Algorithm for Shortest Path',
      description: 'Find the shortest path between a source node and all other nodes in a weighted graph using Dijkstra’s algorithm.',
      link: 'https://www.geeksforgeeks.org/dijkstra-algorithm-for-finding-shortest-path-in-a-graph/',
      level: 'Medium',
    },
    {
      id: 30,
      title: 'Floyd-Warshall Algorithm',
      description: 'Find the shortest paths between all pairs of vertices in a weighted graph using the Floyd-Warshall algorithm.',
      link: 'https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-3/',
      level: 'Hard',
    },
    {
      id: 31,
      title: 'Bipartite Graph Check',
      description: 'Check if a graph is bipartite or not using BFS or DFS.',
      link: 'https://www.geeksforgeeks.org/bipartite-graph/',
      level: 'Medium',
    },
    {
      id: 32,
      title: 'Find Strongly Connected Components (SCC)',
      description: 'Find all strongly connected components in a directed graph using Tarjan’s or Kosaraju’s algorithm.',
      link: 'https://www.geeksforgeeks.org/strongly-connected-components/',
      level: 'Hard',
    },
    {
      id: 33,
      title: 'Eulerian Path and Circuit',
      description: 'Find if a graph has an Eulerian path or circuit.',
      link: 'https://www.geeksforgeeks.org/eulerian-path-and-circuit/',
      level: 'Hard',
    },
    {
      id: 34,
      title: 'Find the Diameter of a Graph',
      description: 'Find the diameter of a graph, which is the longest shortest path between any two vertices.',
      link: 'https://www.geeksforgeeks.org/diameter-of-a-tree/',
      level: 'Medium',
    },
    {
      id: 35,
      title: 'Maximum Bipartite Matching',
      description: 'Find the maximum matching in a bipartite graph.',
      link: 'https://www.geeksforgeeks.org/maximum-bipartite-matching/',
      level: 'Hard',
    },
    {
      id: 36,
      title: 'Graph Traversal using BFS and DFS',
      description: 'Compare and implement BFS and DFS traversal algorithms.',
      link: 'https://www.geeksforgeeks.org/breath-first-search-or-bfs-for-a-graph/',
      level: 'Easy',
    },
    {
      id: 37,
      title: 'Minimum Spanning Tree (Prim’s Algorithm)',
      description: 'Implement Prim’s algorithm to find the minimum spanning tree (MST) of a graph.',
      link: 'https://www.geeksforgeeks.org/prims-minimum-spanning-tree-algorithm-using-priority-queue/',
      level: 'Hard',
    },
    {
      id: 38,
      title: 'Articulation Points (Cut Vertices) in a Graph',
      description: 'Find the articulation points (cut vertices) in an undirected graph.',
      link: 'https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/',
      level: 'Medium',
    },
    {
      id: 39,
      title: 'Bridges (Cut Edges) in a Graph',
      description: 'Find the bridges (cut edges) in an undirected graph.',
      link: 'https://www.geeksforgeeks.org/bridge-in-a-graph/',
      level: 'Medium',
    },
    {
      id: 40,
      title: 'Find Strongly Connected Components using Kosaraju’s Algorithm',
      description: 'Implement Kosaraju’s algorithm to find strongly connected components in a directed graph.',
      link: 'https://www.geeksforgeeks.org/strongly-connected-components/',
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