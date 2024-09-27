import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dfs-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dfs-page.component.html',
  styleUrls: ['./dfs-page.component.css'],
})
export class DfsPageComponent implements AfterViewInit {
  private nodes = [
    { label: 'A', x: 300, y: 50 },
    { label: 'B', x: 200, y: 150 },
    { label: 'C', x: 400, y: 150 },
    { label: 'D', x: 150, y: 250 },
    { label: 'E', x: 250, y: 250 },
    { label: 'F', x: 350, y: 250 },
    { label: 'G', x: 450, y: 250 },
  ];

  private edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];

  ngAfterViewInit() {
    const dfsCanvas = document.getElementById(
      'dfs-canvas'
    ) as HTMLCanvasElement | null;
    if (dfsCanvas) {
      const dfsCtx = dfsCanvas.getContext('2d');
      if (dfsCtx) {
        this.drawGraph(dfsCtx);
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    } else {
      console.error('Canvas element not found');
    }
  }

  private drawGraph(
    ctx: CanvasRenderingContext2D,
    traversalOrder: number[] = []
  ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#000';

    // Draw edges
    this.edges.forEach((edge) => {
      const [from, to] = edge;
      ctx.beginPath();
      ctx.moveTo(this.nodes[from].x, this.nodes[from].y);
      ctx.lineTo(this.nodes[to].x, this.nodes[to].y);
      ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = traversalOrder.includes(index) ? 'red' : 'white';
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fillText(node.label, node.x - 5, node.y + 5);
    });
  }

  startDFSTraversal() {
    const dfsCanvas = document.getElementById(
      'dfs-canvas'
    ) as HTMLCanvasElement | null;
    if (dfsCanvas) {
      const dfsCtx = dfsCanvas.getContext('2d');
      if (dfsCtx) {
        this.drawGraph(dfsCtx);
        this.dfsTraversalVisualization(dfsCtx);
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    }
  }

  resetDFS() {
    const dfsCanvas = document.getElementById(
      'dfs-canvas'
    ) as HTMLCanvasElement | null;
    if (dfsCanvas) {
      const dfsCtx = dfsCanvas.getContext('2d');
      if (dfsCtx) {
        this.drawGraph(dfsCtx);
        document.getElementById('stack-content')!.innerHTML = '';
        document.getElementById('processed-content')!.innerHTML = '';
        document.getElementById('processing-content')!.innerHTML = '';
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    }
  }

  private dfsTraversalVisualization(ctx: CanvasRenderingContext2D) {
    const stackElement = document.getElementById('stack-content')!;
    const processedElement = document.getElementById('processed-content')!;
    const processingElement = document.getElementById('processing-content')!;

    stackElement.innerHTML = '';
    processedElement.innerHTML = '';
    processingElement.innerHTML = '';

    const visited: number[] = [];
    const stack: number[] = [0];
    stackElement.innerHTML = this.nodes[0].label;

    let intervalId = setInterval(() => {
      if (stack.length > 0) {
        const node = stack.pop()!;
        processingElement.innerHTML = this.nodes[node].label;

        if (!visited.includes(node)) {
          visited.push(node);

          processedElement.innerHTML = visited
            .map((index) => this.nodes[index].label)
            .join(', ');
          stackElement.innerHTML = stack
            .map((index) => this.nodes[index].label)
            .join(' -> ');

          const neighbors = this.edges
            .filter((edge) => edge[0] === node && !visited.includes(edge[1]))
            .map((edge) => edge[1])
            .sort((a, b) => this.nodes[a].x - this.nodes[b].x);

          stack.push(...neighbors.reverse());

          this.drawGraph(ctx, visited);
        }

        setTimeout(() => {
          processingElement.innerHTML = '';
        }, 1000);
      } else {
        clearInterval(intervalId);
        processingElement.innerHTML = '';
      }
    }, 1500);
  }
}
