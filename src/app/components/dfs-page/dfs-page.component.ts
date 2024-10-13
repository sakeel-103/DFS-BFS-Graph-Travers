import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dfs-page',
  standalone: true,
  imports: [RouterModule, FormsModule,NavbarComponent],
  templateUrl: './dfs-page.component.html',
  styleUrls: ['./dfs-page.component.css'],
})
export class DfsPageComponent implements AfterViewInit, OnInit {
  private nodes: { label: string; x: number; y: number }[] = [];
  private edges: [number, number][] = [];

  private dfsTimeout: any;
  private dfsCanvas!: HTMLCanvasElement; // Use '!' to indicate it's definitely assigned later
  private maxDepth: number = 0; // New property to track maximum depth

  customNodeInput: string = '';
  customEdgeInput: string = '';
  isDropdownOpen: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // No need to access the canvas here
  }

  ngAfterViewInit(): void {
    this.dfsCanvas = document.getElementById('dfs-canvas') as HTMLCanvasElement;
    const dfsCtx = this.dfsCanvas.getContext('2d')!;

    this.adjustCanvasSize(); // Adjust size first
    this.drawGraph(dfsCtx);  // Then draw
  }
  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private adjustCanvasSize(): void {
    const height = Math.max(400, this.maxDepth * 75); // Maximum height of 600, calculated from depth
    this.dfsCanvas.height = height;
  }

  public startDFSTraversal(): void {
    const dfsCtx = this.dfsCanvas.getContext('2d')!;
    this.positionNodes();  // New: Position nodes before drawing
    this.dfsTraversalVisualization(dfsCtx);
  }

  private positionNodes(): void {
    const root = 0; // Assume BFS starts at node 0 or any other root node
    const levelGap = 80; // Vertical gap between levels
    const nodeGap = 80; // Horizontal gap between nodes in the same level
    const levels: { [key: number]: number[] } = {}; // Store nodes per level
    const visited: boolean[] = new Array(this.nodes.length).fill(false);
    const queue: number[] = [];

    queue.push(root);
    visited[root] = true;
    levels[0] = [root]; // Root is at level 0

    let currentLevel = 1;

    while (queue.length > 0) {
      const node = queue.shift()!;

      // Find the current node level by converting level strings to numbers
      const currentNodeLevel = Object.keys(levels)
        .map(level => parseInt(level))
        .find((level) => levels[level].includes(node)) || 0;

      const nextLevelNodes: number[] = [];

      // Find all neighbors (children) of the current node
      this.edges.forEach((edge) => {
        const [from, to] = edge;

        // Check if the node is either 'from' or 'to' and the other is unvisited
        const neighbor = from === node ? to : from === node ? to : null;

        if (neighbor !== null && !visited[neighbor]) {
          if (!levels[currentLevel]) {
            levels[currentLevel] = [];
          }
          levels[currentLevel].push(neighbor);
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });

      currentLevel++;
    }

    this.maxDepth = currentLevel; // Set the maximum depth

    // Assign node positions based on the calculated levels
    Object.keys(levels).forEach((levelStr) => {
      const level = parseInt(levelStr); // Convert level keys back to numbers
      const nodesAtThisLevel = levels[level];
      nodesAtThisLevel.forEach((node, index) => {
        this.nodes[node].x = index * nodeGap + 50; // Horizontal spacing
        this.nodes[node].y = level * levelGap + 50; // Vertical spacing
      });
    });
  }

  private drawGraph(
    ctx: CanvasRenderingContext2D,
    stack: number[] = [],
    processingNode: number | null = null,
    processed: number[] = []
  ): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#000';

    // Draw edges (including cyclic connections)
    this.edges.forEach((edge) => {
      const [from, to] = edge;
      ctx.beginPath();
      ctx.moveTo(this.nodes[from].x, this.nodes[from].y);
      ctx.lineTo(this.nodes[to].x, this.nodes[to].y);
      ctx.stroke();

      // If there's a cyclic connection, highlight it
      if (from === to) {
        ctx.strokeStyle = 'green'; // Highlight cyclic connections
        ctx.arc(this.nodes[from].x, this.nodes[from].y, 30, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });

    // Draw nodes
    this.nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

      // Determine the fill color based on the node state
      if (processingNode === index) {
        ctx.fillStyle = 'yellow';
      } else if (stack.includes(index)) {
        ctx.fillStyle = 'blue';
      } else if (processed.includes(index)) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'white';
      }

      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fillText(node.label, node.x - 5, node.y + 5);
    });
  }

  private dfsTraversalVisualization(ctx: CanvasRenderingContext2D): void {
    const stackElement = document.getElementById('stack-content') as HTMLElement;
    const processingElement = document.getElementById('processing-content') as HTMLElement;
    const processedElement = document.getElementById('processed-content') as HTMLElement;

    stackElement.innerHTML = '';
    processingElement.innerHTML = '';
    processedElement.innerHTML = '';

    const visited: number[] = [];
    const stack: number[] = [0];  // Start DFS with the root node (node 0)

    stackElement.innerHTML = this.nodes[0]?.label || '';  // Show initial stack with root

    const processNextNode = (): void => {
      if (stack.length > 0) {
        const node: number = stack.pop()!;  // DFS pops from the stack (LIFO behavior)

        // If the node is already visited, backtrack by moving to the next node in the stack
        if (!visited.includes(node)) {
          processingElement.innerHTML = this.nodes[node].label;  // Show the current processing node
          this.drawGraph(ctx, stack, node, visited);  // Update the graph visualization

          this.dfsTimeout = setTimeout(() => {
            visited.push(node);  // Mark node as visited
            processedElement.innerHTML = visited
              .map((index) => this.nodes[index].label)
              .join(', ');  // Update processed nodes list
            stackElement.innerHTML = stack
              .map((index) => this.nodes[index].label)
              .join(' -> ');  // Update stack visualization

            // Get all unvisited neighbors and add them to the stack
            const neighbors: number[] = this.edges
              .filter((edge) => edge[0] === node && !visited.includes(edge[1]))
              .map((edge) => edge[1]);

            if (neighbors.length > 0) {
              // Push neighbors in reverse to explore deeper before backtracking
              stack.push(...neighbors.reverse());
            }

            this.drawGraph(ctx, stack, node, visited);  // Redraw the graph after updating the stack

            // Continue to the next node in DFS order after processing current node
            this.dfsTimeout = setTimeout(processNextNode, 2000);
          }, 1500);
        } else {
          // Node already visited, so backtrack by calling the next node in the stack
          processNextNode();  // Skip visited nodes and backtrack
        }
      }
    };

    processNextNode();  // Start the DFS process
  }

  public onLogout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }

  public resetDFS(): void {
    const dfsCtx = this.dfsCanvas.getContext('2d')!;
    dfsCtx.clearRect(0, 0, this.dfsCanvas.width, this.dfsCanvas.height);
    document.getElementById('stack-content')!.innerHTML = '';
    document.getElementById('processing-content')!.innerHTML = '';
    document.getElementById('processed-content')!.innerHTML = '';

    if (this.dfsTimeout) {
      clearTimeout(this.dfsTimeout);
    }
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleDFSCard() {
    const dfsCard = document.getElementById('dfs-card');
    if (dfsCard) {
      dfsCard.classList.toggle('hidden');  // Toggle the hidden class
    }
  }

  public clearForm(): void {
    this.customNodeInput = '';
    this.customEdgeInput = '';
  }


  // New Methods for Custom Graph Input
  public handleCustomGraphInput(): void {
  if (this.validateCustomNodes() && this.validateCustomEdges()) {
    this.parseCustomNodes();
    this.parseCustomEdges();
    this.positionNodes();
    this.adjustCanvasSize();
    const dfsCtx = this.dfsCanvas.getContext('2d')!;
    this.drawGraph(dfsCtx);
    this.dfsCanvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

private validateCustomNodes(): boolean {
  const nodeInput = this.customNodeInput.trim().split(',');

  // Check for empty input or empty labels
  if (nodeInput.length === 0 || nodeInput.some(label => label.trim() === '')) {
    alert('Node input is invalid. Ensure all nodes have non-empty labels.');
    return false;
  }

  // Check for duplicate labels
  const uniqueLabels = new Set(nodeInput.map(label => label.trim()));
  if (uniqueLabels.size !== nodeInput.length) {
    alert('Node input contains duplicate labels. Ensure all nodes have unique labels.');
    return false;
  }

  return true;
}

private validateCustomEdges(): boolean {
  const edgeInput = this.customEdgeInput.trim().split(';');

  // Check for proper edge formatting (must contain at least one '-')
  for (const edge of edgeInput) {
    const nodes = edge.split('-');
    if (nodes.length !== 2 || isNaN(Number(nodes[0])) || isNaN(Number(nodes[1]))) {
      alert(`Invalid edge format: ${edge}. Edges should be formatted as 'from-to', where 'from' and 'to' are valid node indices.`);
      return false;
    }

    // Check if the node indices are within bounds
    const from = Number(nodes[0]);
    const to = Number(nodes[1]);


  }

  return true;
}

private parseCustomNodes(): void {
  const nodeInput = this.customNodeInput.trim().split(',');

  // Check for empty input or invalid formats
  if (nodeInput.length === 0 || nodeInput.some(label => label.trim() === '')) {
    alert('Invalid node input format. Please enter valid node labels separated by commas.');
    this.nodes = []; // Reset nodes to avoid further issues
    return;
  }

  this.nodes = nodeInput.map((label, index) => {
    return {
      label: label.trim(),
      x: 100 + 100 * (index % 5),
      y: 100 + 100 * Math.floor(index / 5),
    };
  });
}

private parseCustomEdges(): void {
  const edgeInput = this.customEdgeInput.trim().split(';');

  // Check for empty input or invalid formats
  if (edgeInput.length === 0 || edgeInput.some(edge => edge.trim() === '')) {
    alert('Invalid edge input format. Please enter valid edges in the format "from-to" separated by semicolons.');
    this.edges = []; // Reset edges to avoid further issues
    return;
  }

  // Validate edge format and update edges
  const newEdges: [number, number][] = [];
  for (const edge of edgeInput) {
    const [from, to] = edge.split('-').map(Number);

    // Check for valid number conversion
    if (isNaN(from) || isNaN(to) || from < 0 || to < 0 || from >= this.nodes.length || to >= this.nodes.length) {
      alert(`Invalid edge: ${edge}. Please ensure both nodes are valid indices.`);
      this.edges = []; // Reset edges if any edge is invalid
      return;
    }
    newEdges.push([from, to]);
  }

  this.edges = newEdges;


}
}
