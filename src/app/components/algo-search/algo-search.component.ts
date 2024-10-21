import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

interface Algorithm {
  name: string;
  description: string;
  useCases: string;
  codeSnippet: string;
}

@Component({
  selector: 'app-algorithm-library-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './algo-search.component.html',
  styleUrls: ['./algo-search.component.css'],
})
export class AlgorithmLibraryPageComponent implements OnInit {
  searchTerm: string = '';
  filteredAlgorithms: Algorithm[] | null = null;

  algorithms: Algorithm[] = [
    {
      name: 'Depth-First Search (DFS)',
      description: 'A traversal algorithm that explores as far as possible along each branch before backtracking.',
      useCases: 'Maze solving, connected components, topological sorting',
      codeSnippet: `function DFS(graph, start) {
  let visited = new Set();
  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);
    for (let neighbor of graph[node]) {
      dfs(neighbor);
    }
  }
  dfs(start);
}`,
    },
    {
      name: 'Breadth-First Search (BFS)',
      description: 'A traversal algorithm that explores nodes layer by layer.',
      useCases: 'Shortest path in unweighted graphs, social networks',
      codeSnippet: `function BFS(graph, start) {
  let queue = [start];
  let visited = new Set([start]);
  while (queue.length > 0) {
    let node = queue.shift();
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    },
    {
      name: "Dijkstra's Algorithm",
      description: 'An algorithm that finds the shortest paths between nodes in a graph with non-negative weights.',
      useCases: 'Network routing, GPS navigation',
      codeSnippet: `function dijkstra(graph, start) {
  let distances = {};
  let visited = new Set();
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  let pq = new PriorityQueue();
  pq.enqueue([start, 0]);
  while (!pq.isEmpty()) {
    let [currentNode, currentDistance] = pq.dequeue();
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);
    for (let neighbor in graph[currentNode]) {
      let newDist = currentDistance + graph[currentNode][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue([neighbor, newDist]);
      }
    }
  }
  return distances;
}`,
    },
    {
      name: 'A* Search Algorithm',
      description: 'An informed search algorithm that finds the shortest path by considering both cost and heuristic.',
      useCases: 'Pathfinding in games, GPS navigation',
      codeSnippet: `function aStarSearch(graph, start, goal) {
  let openSet = new PriorityQueue();
  openSet.enqueue([start, 0]);
  let cameFrom = new Map();
  let gScore = new Map([[start, 0]]);
  let fScore = new Map([[start, heuristic(start, goal)]]);
  while (!openSet.isEmpty()) {
    let current = openSet.dequeue();
    if (current === goal) return reconstructPath(cameFrom, current);
    for (let neighbor of graph[current]) {
      let tentativeGScore = gScore.get(current) + distBetween(current, neighbor);
      if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
        openSet.enqueue([neighbor, fScore.get(neighbor)]);
      }
    }
  }
  return [];
}`,
    },
    {
      name: 'Prim\'s Algorithm',
      description: 'An algorithm to find the minimum spanning tree in a graph.',
      useCases: 'Network design, cable routing, road construction',
      codeSnippet: `function prim(graph) {
  let mst = [];
  let visited = new Set();
  let pq = new PriorityQueue();
  pq.enqueue([0, null, 0]); // [weight, parent, node]
  while (!pq.isEmpty()) {
    let [weight, parent, node] = pq.dequeue();
    if (!visited.has(node)) {
      visited.add(node);
      if (parent !== null) mst.push([parent, node, weight]);
      for (let [neighbor, weight] of graph[node]) {
        if (!visited.has(neighbor)) pq.enqueue([weight, node, neighbor]);
      }
    }
  }
  return mst;
}`,
    },
    {
      name: 'Kruskal\'s Algorithm',
      description: 'An algorithm that finds the minimum spanning tree by sorting all edges.',
      useCases: 'Network design, clustering',
      codeSnippet: `function kruskal(graph) {
  let mst = [];
  let disjointSet = new DisjointSet(graph.length);
  let edges = graph.edges.sort((a, b) => a[2] - b[2]); // Sort edges by weight
  for (let [u, v, weight] of edges) {
    if (disjointSet.find(u) !== disjointSet.find(v)) {
      disjointSet.union(u, v);
      mst.push([u, v, weight]);
    }
  }
  return mst;
}`,
    },
    {
      name: 'Merge Sort',
      description: 'A divide and conquer algorithm that splits the list into halves and merges them in sorted order.',
      useCases: 'Sorting large datasets, external sorting',
      codeSnippet: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    },
    {
      name: 'Quick Sort',
      description: 'An efficient sorting algorithm using partitioning to sort elements.',
      useCases: 'Sorting in-place, efficient comparison sorting',
      codeSnippet: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[arr.length - 1];
  let left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    },
    {
      name: 'Floyd-Warshall Algorithm',
      description: 'An algorithm to find the shortest paths between all pairs of nodes in a graph.',
      useCases: 'Network routing, distance matrix generation',
      codeSnippet: `function floydWarshall(graph) {
  let dist = [];
  for (let i = 0; i < graph.length; i++) {
    dist[i] = [...graph[i]];
  }
  for (let k = 0; k < graph.length; k++) {
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
    },
    {
      name: 'Bellman-Ford Algorithm',
      description: 'An algorithm to find the shortest paths in graphs that may have negative weight edges.',
      useCases: 'Finding shortest path in graphs with negative cycles',
      codeSnippet: `function bellmanFord(graph, start) {
  let distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;
  for (let i = 0; i < graph.length - 1; i++) {
    for (let [u, v, weight] of graph.edges) {
      if (distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }
  return distances;
}`,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.filteredAlgorithms = this.algorithms;
  }

  filterAlgorithms(): void {
    this.filteredAlgorithms = this.algorithms.filter(algorithm =>
      algorithm.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      algorithm.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
