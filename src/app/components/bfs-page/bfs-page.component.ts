import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bfs-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bfs-page.component.html',
  styleUrls: ['./bfs-page.component.css'],
})
export class BfsPageComponent implements AfterViewInit, OnInit {
  private nodes = [
    { label: 'A', x: 300, y: 50 },
    { label: 'B', x: 200, y: 150 },
    { label: 'C', x: 400, y: 150 },
    { label: 'D', x: 150, y: 250 },
    { label: 'E', x: 250, y: 250 },
    { label: 'F', x: 350, y: 250 },
    { label: 'G', x: 450, y: 250 },
  ];

  private edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];

  private bfsTimeout: any;

  constructor() {}

  ngOnInit(): void {
    const bfsCanvas = document.getElementById(
      'bfs-canvas'
    ) as HTMLCanvasElement;
    const bfsCtx = bfsCanvas.getContext('2d')!;
    this.drawGraph(bfsCtx);
  }

  ngAfterViewInit(): void {}

  public startBFSTraversal(): void {
    const bfsCanvas = document.getElementById(
      'bfs-canvas'
    ) as HTMLCanvasElement;
    const bfsCtx = bfsCanvas.getContext('2d')!;
    this.bfsTraversalVisualization(bfsCtx);
  }

  private drawGraph(
    ctx: CanvasRenderingContext2D,
    queue: number[] = [],
    processingNode: number | null = null,
    processed: number[] = []
  ): void {
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
    queueElement.innerHTML = this.nodes[0].label;

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
}
