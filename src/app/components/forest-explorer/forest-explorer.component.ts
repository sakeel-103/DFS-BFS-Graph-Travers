import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Position {
  row: number;
  col: number;
}

@Component({
  selector: 'app-forest-explorer',
  templateUrl: './forest-explorer.component.html',
  styleUrls: ['./forest-explorer.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  standalone: true,
})
export class ForestExplorerComponent implements OnInit {
  gridSize = { rows: 8, cols: 8 };
  grid: string[][] = [];
  exploring = false;
  startPos: Position = { row: 0, col: 0 };
  visitedCells = new Set<string>();
  speed = 300;
  stats = { plantsFound: 0, cellsExplored: 0 };

  treeTypes = {
    PINE: '🌲',
    OAK: '🌳',
    EMPTY: '·',
    RARE: '🌺',
  };

  ngOnInit(): void {
    this.initializeForest();
  }

  initializeForest(): void {
    this.grid = Array.from({ length: this.gridSize.rows }, () =>
      Array.from({ length: this.gridSize.cols }, () => this.getRandomTreeType())
    );
    this.visitedCells.clear();
    this.stats = { plantsFound: 0, cellsExplored: 0 };
  }

  getRandomTreeType(): string {
    const random = Math.random();
    if (random < 0.1) return this.treeTypes.RARE;
    if (random < 0.4) return this.treeTypes.PINE;
    if (random < 0.7) return this.treeTypes.OAK;
    return this.treeTypes.EMPTY;
  }

  async explore(row: number, col: number): Promise<void> {
    if (this.exploring) return;
    this.exploring = true;
    const queue: Position[] = [{ row, col }];

    while (queue.length > 0) {
      const { row, col } = queue.shift()!;
      if (this.isOutOfBounds(row, col) || this.visitedCells.has(`${row},${col}`)) {
        continue;
      }

      this.visitedCells.add(`${row},${col}`);
      this.stats.cellsExplored++;
      if (this.grid[row][col] === this.treeTypes.RARE) {
        this.stats.plantsFound++;
      }
      await this.delay(this.speed);

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      directions.forEach(([dr, dc]) => queue.push({ row: row + dr, col: col + dc }));
    }
    this.exploring = false;
  }

  isOutOfBounds(row: number, col: number): boolean {
    return row < 0 || row >= this.gridSize.rows || col < 0 || col >= this.gridSize.cols;
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleCellClick(row: number, col: number): void {
    if (!this.exploring) {
      this.startPos = { row, col };
      this.visitedCells.clear();
      this.stats = { plantsFound: 0, cellsExplored: 0 };
    }
  }

  setGridSize(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.gridSize.rows = parseInt(target.value, 10);
      this.gridSize.cols = parseInt(target.value, 10);
      this.initializeForest();
    }
  }

  setSpeed(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.speed = parseInt(target.value, 10);
    }
  }
}
