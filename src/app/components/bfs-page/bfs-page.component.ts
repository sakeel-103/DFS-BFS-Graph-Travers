import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bfs-page',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './bfs-page.component.html',
  styleUrls: ['./bfs-page.component.css'],
})
export class BfsPageComponent implements AfterViewInit, OnInit {
  private nodes: { label: string; x: number; y: number }[] = [];
  private edges: [number, number][] = [];

  private bfsTimeout: any;

  customNodeInput: string = '';
  customEdgeInput: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const bfsCanvas = document.getElementById(
      'bfs-canvas'
    ) as HTMLCanvasElement;
    const bfsCtx = bfsCanvas.getContext('2d')!;
    this.drawGraph(bfsCtx);
  }

  ngAfterViewInit(): void {}

  public startBFSTraversal(): void {
    const bfsCanvas = document.getElementById('bfs-canvas') as HTMLCanvasElement;
    const bfsCtx = bfsCanvas.getContext('2d')!;
    this.positionNodes();  // New: Position nodes before drawing
    this.bfsTraversalVisualization(bfsCtx);
  }

  private positionNodes(): void {
    const root = 0; // Assume BFS starts at node 0 or any other root node
    const levelGap = 100; // Vertical gap between levels
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
    queue: number[] = [],
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
      } else if (queue.includes(index)) {
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

  private bfsTraversalVisualization(ctx: CanvasRenderingContext2D): void {
    const queueElement = document.getElementById(
      'queue-content'
    ) as HTMLElement;
    const processingElement = document.getElementById(
      'processing-content'
    ) as HTMLElement;
    const processedElement = document.getElementById(
      'processed-content'
    ) as HTMLElement;

    queueElement.innerHTML = '';
    processingElement.innerHTML = '';
    processedElement.innerHTML = '';

    const visited: number[] = [];
    const queue: number[] = [0];
    queueElement.innerHTML = this.nodes[0]?.label || '';

    const processNextNode = (): void => {
      if (queue.length > 0) {
        const node: number = queue.shift()!;

        if (!visited.includes(node)) {
          processingElement.innerHTML = this.nodes[node].label;
          this.drawGraph(ctx, queue, node, visited);

          this.bfsTimeout = setTimeout(() => {
            visited.push(node);
            processedElement.innerHTML = visited
              .map((index) => this.nodes[index].label)
              .join(', ');
            queueElement.innerHTML = queue
              .map((index) => this.nodes[index].label)
              .join(' -> ');

            const neighbors: number[] = this.edges
              .filter((edge) => edge[0] === node && !visited.includes(edge[1]))
              .map((edge) => edge[1]);

            queue.push(...neighbors);

            this.drawGraph(ctx, queue, node, visited);
            this.bfsTimeout = setTimeout(processNextNode, 2000);
          }, 1500);
        } else {
          processNextNode();
        }
      }
    };

    processNextNode();
  }

  public onLogout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }

  public resetBFS(): void {
    const bfsCanvas = document.getElementById(
      'bfs-canvas'
    ) as HTMLCanvasElement;
    const bfsCtx = bfsCanvas.getContext('2d')!;
    this.drawGraph(bfsCtx);
    document.getElementById('queue-content')!.innerHTML = '';
    document.getElementById('processing-content')!.innerHTML = '';
    document.getElementById('processed-content')!.innerHTML = '';

    if (this.bfsTimeout) {
      clearTimeout(this.bfsTimeout);
    }
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleBFSCard() {
    const bfsCard = document.getElementById('bfs-card');
    if (bfsCard) {
      bfsCard.classList.toggle('hidden');  // Toggle the hidden class
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
      this.resetBFS();

      const bfsCanvas = document.getElementById('bfs-canvas');
      if (bfsCanvas) {
      bfsCanvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
