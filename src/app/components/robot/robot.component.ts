import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-navigator',
  template: `
    <div class="card w-full max-w-4xl mx-auto">
      <div class="card-header">
        <h2 class="text-center">Robot Navigator</h2>
      </div>
      <div class="card-content">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2">
              <label>Grid Size:</label>
              <input
                type="range"
                min="5"
                max="12"
                [value]="gridSize.rows"
                (input)="updateGridSize($event)"
                class="w-32"
                [disabled]="isAnimating"
              />
              <span>{{ gridSize.rows }}x{{ gridSize.cols }}</span>
            </div>
            <div class="flex items-center gap-2">
              <label>Speed:</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                [value]="animationSpeed"
                (input)="updateAnimationSpeed($event)"
                class="w-32"
                [disabled]="isAnimating"
              />
              <span>{{ animationSpeed }}ms</span>
            </div>
          </div>
          
          <div class="flex justify-center gap-4">
            <button (click)="bfs()" [disabled]="isAnimating" class="btn btn-primary">
              Start BFS
            </button>
            <button (click)="dfs()" [disabled]="isAnimating" class="btn btn-success">
              Start DFS
            </button>
            <button (click)="generateObstacles()" [disabled]="isAnimating" class="btn btn-warning">
              Random Obstacles
            </button>
            <button (click)="resetGrid()" [disabled]="isAnimating" class="btn btn-secondary">
              Reset
            </button>
          </div>

          <div class="flex justify-center">
            <svg
              [attr.width]="svgWidth"
              [attr.height]="svgHeight"
              class="border rounded"
            >
              <!-- Grid -->
              <ng-container *ngFor="let row of [].constructor(gridSize.rows); let rowIndex = index">
                <ng-container *ngFor="let col of [].constructor(gridSize.cols); let colIndex = index">
                  <g (click)="handleCellClick(rowIndex, colIndex)">
                    <rect
                      [attr.x]="colIndex * cellSize + padding"
                      [attr.y]="rowIndex * cellSize + padding"
                      [attr.width]="cellSize"
                      [attr.height]="cellSize"
                      [attr.fill]="getCellColor(rowIndex, colIndex)"
                      stroke="#ccc"
                      class="cursor-pointer"
                    ></rect>
                    <!-- Robot Icon -->
                    <g *ngIf="isRobotPosition(rowIndex, colIndex)" [attr.transform]="'translate(' + (colIndex * cellSize + padding + cellSize/2) + ',' + (rowIndex * cellSize + padding + cellSize/2) + ')'">
                      <circle cx="0" cy="0" r="10" fill="blue"></circle>
                    </g>
                    <!-- Target Icon -->
                    <g *ngIf="isTargetPosition(rowIndex, colIndex)" [attr.transform]="'translate(' + (colIndex * cellSize + padding + cellSize/2) + ',' + (rowIndex * cellSize + padding + cellSize/2) + ')'">
                      <circle cx="0" cy="0" r="10" fill="red"></circle>
                    </g>
                  </g>
                </ng-container>
              </ng-container>
            </svg>
          </div>

          <div *ngIf="stats.nodesVisited > 0" class="mt-4 p-4 bg-gray-100 rounded">
            <h3 class="font-bold mb-2">Statistics</h3>
            <div class="grid grid-cols-3 gap-4">
              <div>Nodes Visited: {{ stats.nodesVisited }}</div>
              <div>Path Length: {{ stats.pathLength }}</div>
              <div>Time Taken: {{ stats.timeTaken }}ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card { /* Card styling here */ }
      .card-header, .card-content { /* Add any additional styling */ }
      .btn { padding: 8px 16px; border-radius: 4px; transition: background 0.3s; }
      .btn-primary { background-color: #4c6ef5; color: white; }
      .btn-success { background-color: #28a745; color: white; }
      .btn-warning { background-color: #ffc107; color: white; }
      .btn-secondary { background-color: #868e96; color: white; }
      circle { transition: all 0.3s ease; }
    `
  ]
})
export class RobotNavigatorComponent implements OnInit {
  gridSize = { rows: 8, cols: 8 };
  robotPosition = { row: 0, col: 0 };
  targetPosition = { row: 7, col: 7 };
  obstacles = new Set<string>();
  isAnimating = false;
  animationSpeed = 300;
  stats = { nodesVisited: 0, pathLength: 0, timeTaken: 0 };
  visitedNodes = new Set<string>();
  path: string[] = [];
  cellSize = 60;
  padding = 20;
  svgWidth = this.gridSize.cols * this.cellSize + 2 * this.padding;
  svgHeight = this.gridSize.rows * this.cellSize + 2 * this.padding;

  ngOnInit(): void {
    this.resetGrid();
  }

  updateGridSize(event: Event): void {
    const size = +(event.target as HTMLInputElement).value;
    this.gridSize = { rows: size, cols: size };
    this.resetGrid();
  }

  updateAnimationSpeed(event: Event): void {
    this.animationSpeed = +(event.target as HTMLInputElement).value;
  }

  resetGrid(): void {
    this.visitedNodes.clear();
    this.path = [];
    this.stats = { nodesVisited: 0, pathLength: 0, timeTaken: 0 };
    this.obstacles.clear();
  }

  generateObstacles(): void {
    const newObstacles = new Set<string>();
    const obstacleCount = Math.floor((this.gridSize.rows * this.gridSize.cols) * 0.2);

    while (newObstacles.size < obstacleCount) {
      const row = Math.floor(Math.random() * this.gridSize.rows);
      const col = Math.floor(Math.random() * this.gridSize.cols);
      const key = `${row},${col}`;

      if (key !== `${this.robotPosition.row},${this.robotPosition.col}` && key !== `${this.targetPosition.row},${this.targetPosition.col}`) {
        newObstacles.add(key);
      }
    }
    this.obstacles = newObstacles;
  }

  async bfs(): Promise<void> {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const startTime = performance.now();
    const queue = [[this.robotPosition.row, this.robotPosition.col]];
    const visited = new Set<string>([`${this.robotPosition.row},${this.robotPosition.col}`]);
    const parent = new Map<string, string>();
    const newVisitedNodes = new Set<string>();

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;
      if (row === this.targetPosition.row && col === this.targetPosition.col) break;
      
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const newRow = row + dr;
        const newCol = col + dc;
        const key = `${newRow},${newCol}`;

        if (newRow >= 0 && newRow < this.gridSize.rows && newCol >= 0 && newCol < this.gridSize.cols && !visited.has(key) && !this.obstacles.has(key)) {
          queue.push([newRow, newCol]);
          visited.add(key);
          parent.set(key, `${row},${col}`);
          newVisitedNodes.add(key);
          await this.delay();
          this.visitedNodes.add(key);
        }
      }
    }
    
    const path = [];
    let current = `${this.targetPosition.row},${this.targetPosition.col}`;
    while (parent.has(current)) {
      path.unshift(current);
      current = parent.get(current)!;
    }
    this.path = path;
    this.stats = {
      nodesVisited: newVisitedNodes.size,
      pathLength: path.length,
      timeTaken: Math.round(performance.now() - startTime)
    };
    this.isAnimating = false;
  }

  async dfs(): Promise<void> {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const startTime = performance.now();
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const newVisitedNodes = new Set<string>();

    const dfsRecursive = async (row: number, col: number): Promise<boolean> => {
      const key = `${row},${col}`;
      if (row === this.targetPosition.row && col === this.targetPosition.col) return true;
      visited.add(key);
      newVisitedNodes.add(key);
      await this.delay();
      this.visitedNodes.add(key);

      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const newRow = row + dr;
        const newCol = col + dc;
        const newKey = `${newRow},${newCol}`;

        if (newRow >= 0 && newRow < this.gridSize.rows && newCol >= 0 && newCol < this.gridSize.cols && !visited.has(newKey) && !this.obstacles.has(newKey)) {
          parent.set(newKey, key);
          if (await dfsRecursive(newRow, newCol)) return true;
        }
      }
      return false;
    };

    const found = await dfsRecursive(this.robotPosition.row, this.robotPosition.col);
    const path = [];
    let current = `${this.targetPosition.row},${this.targetPosition.col}`;
    while (parent.has(current)) {
      path.unshift(current);
      current = parent.get(current)!;
    }
    this.path = path;
    this.stats = {
      nodesVisited: newVisitedNodes.size,
      pathLength: path.length,
      timeTaken: Math.round(performance.now() - startTime)
    };
    this.isAnimating = false;
  }

  handleCellClick(row: number, col: number): void {
    if (this.isAnimating) return;
    const key = `${row},${col}`;
    if (key === `${this.robotPosition.row},${this.robotPosition.col}` || key === `${this.targetPosition.row},${this.targetPosition.col}`) return;

    this.obstacles.has(key) ? this.obstacles.delete(key) : this.obstacles.add(key);
    this.visitedNodes.clear();
    this.path = [];
  }

  getCellColor(row: number, col: number): string {
    const key = `${row},${col}`;
    if (this.obstacles.has(key)) return '#666';
    if (this.path.includes(key)) return '#4ade80';
    if (this.visitedNodes.has(key)) return '#93c5fd';
    return 'white';
  }

  isRobotPosition(row: number, col: number): boolean {
    return this.robotPosition.row === row && this.robotPosition.col === col;
  }

  isTargetPosition(row: number, col: number): boolean {
    return this.targetPosition.row === row && this.targetPosition.col === col;
  }

  delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
  }
}
