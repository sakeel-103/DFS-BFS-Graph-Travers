import { Component, OnInit, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tower-traversal-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="title">Tower Traversal Visualizer</h2>
      
      <div class="controls-panel">
        <div class="size-controls">
          <div class="control-group">
            <label>Floors:</label>
            <input type="range" [(ngModel)]="floors" min="2" max="8" (change)="resetAndRedraw()">
            <span>{{floors}}</span>
          </div>
          <div class="control-group">
            <label>Rooms per Floor:</label>
            <input type="range" [(ngModel)]="roomsPerFloor" min="2" max="8" (change)="resetAndRedraw()">
            <span>{{roomsPerFloor}}</span>
          </div>
        </div>

        <div class="speed-control">
          <label>Animation Speed:</label>
          <input type="range" [(ngModel)]="animationSpeed" min="50" max="1000" step="50">
          <span>{{animationSpeed}}ms</span>
        </div>

        <div class="algorithm-controls">
          <button [disabled]="isAnimating" (click)="startDFS(start.floor, start.room)" class="btn btn-primary">
            Start DFS
          </button>
          <button [disabled]="isAnimating" (click)="startBFS()" class="btn btn-primary">
            Start BFS
          </button>
          <button [disabled]="isAnimating" (click)="resetAndRedraw()" class="btn btn-secondary">
            Reset
          </button>
        </div>

        <div class="legend">
          <div class="legend-item">
            <div class="color-box start"></div>
            <span>Start</span>
          </div>
          <div class="legend-item">
            <div class="color-box target"></div>
            <span>Target</span>
          </div>
          <div class="legend-item">
            <div class="color-box visited"></div>
            <span>Visited</span>
          </div>
          <div class="legend-item">
            <div class="color-box path"></div>
            <span>Found Path</span>
          </div>
        </div>
      </div>

      <div class="visualization-container">
        <svg #towerSvg id="tower-svg" [attr.width]="svgWidth" [attr.height]="svgHeight">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      <div class="stats-panel" *ngIf="stats.nodesVisited > 0">
        <h3>Statistics</h3>
        <p>Nodes Visited: {{stats.nodesVisited}}</p>
        <p>Path Length: {{stats.pathLength}}</p>
        <p>Time Taken: {{stats.timeTaken}}ms</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }

    .title {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .controls-panel {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .size-controls, .speed-control {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .control-group label {
      min-width: 120px;
    }

    input[type="range"] {
      width: 200px;
    }

    .algorithm-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      justify-content: center;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: #4c6ef5;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #364fc7;
    }

    .btn-secondary {
      background: #868e96;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #495057;
    }

    .visualization-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: auto;
      margin-bottom: 20px;
    }

    #tower-svg {
      display: block;
      margin: 0 auto;
      background: #ffffff;
    }

    .legend {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 15px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .color-box {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }

    .color-box.start { background: #4c6ef5; }
    .color-box.target { background: #fa5252; }
    .color-box.visited { background: #fab005; }
    .color-box.path { background: #40c057; }

    .stats-panel {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    circle {
      transition: fill 0.3s ease;
      cursor: pointer;
    }

    circle:hover {
      filter: url(#glow);
    }

    text {
      pointer-events: none;
      user-select: none;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class TowerTraversalVisualizerComponent implements OnInit {
  floors: number = 5;
  roomsPerFloor: number = 5;
  start = { floor: 0, room: 0 };
  target = { floor: 4, room: 4 };
  animationSpeed: number = 300;
  isAnimating: boolean = false;
  svgWidth: number = 800;
  svgHeight: number = 600;
  stats = { nodesVisited: 0, pathLength: 0, timeTaken: 0 };

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.resetAndRedraw();
  }

  resetAndRedraw(): void {
    const svg = this.el.nativeElement.querySelector('#tower-svg');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    this.stats = { nodesVisited: 0, pathLength: 0, timeTaken: 0 };
    this.svgWidth = Math.max(800, this.roomsPerFloor * 120 + 100);
    this.svgHeight = Math.max(600, this.floors * 100 + 100);
    this.drawConnections();
    this.drawNodes();
  }

  getRoomColor(floor: number, room: number): string {
    if (floor === this.start.floor && room === this.start.room) return '#4c6ef5'; // Start (blue)
    if (floor === this.target.floor && room === this.target.room) return '#fa5252'; // Target (red)
    return '#dee2e6'; // Default (light gray)
  }

  handleNodeClick(floor: number, room: number): void {
    if (this.isAnimating) return;
    if (this.start.floor === floor && this.start.room === room) return;
    if (this.target.floor === floor && this.target.room === room) return;

    this.target = { floor, room };
    this.resetAndRedraw();
  }

  drawNodes(): void {
    const svg = this.el.nativeElement.querySelector('#tower-svg');
    for (let floor = 0; floor < this.floors; floor++) {
      for (let room = 0; room < this.roomsPerFloor; room++) {
        const x = 50 + room * 100;
        const y = 50 + floor * 70;

        const g = this.renderer.createElement('g', 'svg');
        const circle = this.renderer.createElement('circle', 'svg');
        this.renderer.setAttribute(circle, 'cx', x.toString());
        this.renderer.setAttribute(circle, 'cy', y.toString());
        this.renderer.setAttribute(circle, 'r', '20');
        this.renderer.setAttribute(circle, 'data-floor', floor.toString());
        this.renderer.setAttribute(circle, 'data-room', room.toString());
        this.renderer.setStyle(circle, 'fill', this.getRoomColor(floor, room));

        const text = this.renderer.createElement('text', 'svg');
        this.renderer.setAttribute(text, 'x', x.toString());
        this.renderer.setAttribute(text, 'y', (y + 5).toString());
        this.renderer.setAttribute(text, 'text-anchor', 'middle');
        this.renderer.setAttribute(text, 'fill', 'white');
        this.renderer.setStyle(text, 'font-size', '12px');
        text.textContent = `${floor},${room}`;

        this.renderer.listen(circle, 'click', () => this.handleNodeClick(floor, room));

        this.renderer.appendChild(g, circle);
        this.renderer.appendChild(g, text);
        this.renderer.appendChild(svg, g);
      }
    }
  }

  drawConnections(): void {
    const svg = this.el.nativeElement.querySelector('#tower-svg');
    for (let floor = 0; floor < this.floors; floor++) {
      for (let room = 0; room < this.roomsPerFloor; room++) {
        const x = 50 + room * 100;
        const y = 50 + floor * 70;

        if (room < this.roomsPerFloor - 1) {
          const line = this.renderer.createElement('line', 'svg');
          this.renderer.setAttribute(line, 'x1', x.toString());
          this.renderer.setAttribute(line, 'y1', y.toString());
          this.renderer.setAttribute(line, 'x2', (x + 100).toString());
          this.renderer.setAttribute(line, 'y2', y.toString());
          this.renderer.setAttribute(line, 'stroke', '#ddd');
          this.renderer.setAttribute(line, 'stroke-width', '2');
          this.renderer.appendChild(svg, line);
        }

        if (floor < this.floors - 1) {
          const line = this.renderer.createElement('line', 'svg');
          this.renderer.setAttribute(line, 'x1', x.toString());
          this.renderer.setAttribute(line, 'y1', y.toString());
          this.renderer.setAttribute(line, 'x2', x.toString());
          this.renderer.setAttribute(line, 'y2', (y + 70).toString());
          this.renderer.setAttribute(line, 'stroke', '#ddd');
          this.renderer.setAttribute(line, 'stroke-width', '2');
          this.renderer.appendChild(svg, line);
        }
      }
    }
  }

  async startDFS(floor: number, room: number): Promise<boolean> {
    if (!this.isAnimating) {
      this.isAnimating = true;
      const startTime = performance.now();
      this.stats.nodesVisited = 0;
      const visited = new Set<string>();
      const path = new Map<string, string>();
      const result = await this.dfs(floor, room, visited, path);
      if (result) await this.highlightPath(path);
      this.stats.timeTaken = Math.round(performance.now() - startTime);
      this.isAnimating = false;
      return result;
    }
    return false;
  }

  private async dfs(floor: number, room: number, visited: Set<string>, path: Map<string, string>): Promise<boolean> {
    const key = `${floor},${room}`;
    if (floor < 0 || room < 0 || floor >= this.floors || room >= this.roomsPerFloor || visited.has(key)) return false;

    visited.add(key);
    this.stats.nodesVisited++;
    const currentCircle = this.el.nativeElement.querySelector(`#tower-svg circle[data-floor="${floor}"][data-room="${room}"]`);
    if (currentCircle && !this.isStartOrTarget(floor, room)) {
      currentCircle.style.fill = '#fab005';
      await this.delay();
    }
    if (floor === this.target.floor && room === this.target.room) return true;

    for (const [df, dr] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const newFloor = floor + df;
      const newRoom = room + dr;
      const newKey = `${newFloor},${newRoom}`;
      if (await this.dfs(newFloor, newRoom, visited, path)) {
        path.set(newKey, key);
        return true;
      }
    }
    return false;
  }

  async startBFS(): Promise<void> {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const startTime = performance.now();
    const queue: Array<{ floor: number; room: number }> = [{ floor: this.start.floor, room: this.start.room }];
    const visited = new Set<string>([`${this.start.floor},${this.start.room}`]);
    const path = new Map<string, string>();
    this.stats.nodesVisited = 0;

    while (queue.length > 0) {
      const { floor, room } = queue.shift()!;
      if (floor === this.target.floor && room === this.target.room) {
        this.stats.timeTaken = Math.round(performance.now() - startTime);
        await this.highlightPath(path);
        this.isAnimating = false;
        return;
      }
      for (const [df, dr] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const newFloor = floor + df;
        const newRoom = room + dr;
        const key = `${newFloor},${newRoom}`;
        if (newFloor >= 0 && newRoom >= 0 && newFloor < this.floors && newRoom < this.roomsPerFloor && !visited.has(key)) {
          visited.add(key);
          queue.push({ floor: newFloor, room: newRoom });
          path.set(key, `${floor},${room}`);
          this.stats.nodesVisited++;
          await this.delay();
        }
      }
    }
    this.isAnimating = false;
  }

  private async highlightPath(path: Map<string, string>): Promise<void> {
    let currentKey = `${this.target.floor},${this.target.room}`;
    this.stats.pathLength = 0;
    while (path.has(currentKey)) {
      const [floor, room] = currentKey.split(',').map(Number);
      const circle = this.el.nativeElement.querySelector(`#tower-svg circle[data-floor="${floor}"][data-room="${room}"]`);
      if (circle) circle.style.fill = '#40c057';
      await this.delay();
      currentKey = path.get(currentKey)!;
      this.stats.pathLength++;
    }
  }

  private delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
  }

  isStartOrTarget(floor: number, room: number): boolean {
    return (floor === this.start.floor && room === this.start.room) || (floor === this.target.floor && room === this.target.room);
  }
}
