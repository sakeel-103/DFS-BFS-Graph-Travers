// treasure-hunt-visualizer.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-treasure-hunt-visualizer',
  templateUrl: './treasure-hunt-visualizer.component.html',
  styleUrls: ['./treasure-hunt-visualizer.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, NavbarComponent],
  standalone: true,
})
export class TreasureHuntVisualizerComponent implements OnInit {
  gridDFS: number[][] = [];
  gridBFS: number[][] = [];
  rows: number = 10;
  cols: number = 10;
  treasures: [number, number][] = [];
  start: [number, number] = [0, 0];

  ngOnInit(): void {
    this.createGrid();
    this.placeTreasures();
  }

  createGrid(): void {
    this.gridDFS = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.gridBFS = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.gridDFS[this.start[0]][this.start[1]] = 2; // Start point
    this.gridBFS[this.start[0]][this.start[1]] = 2; // Start point
  }

  placeTreasures(): void {
    this.treasures = [
      [2, 3],
      [5, 6],
      [8, 1],
      [3, 7],
    ];
    this.treasures.forEach(([x, y]) => {
      this.gridDFS[x][y] = 3;
      this.gridBFS[x][y] = 3;
    });
  }

  async dfs(x: number, y: number): Promise<void> {
    if (x < 0 || y < 0 || x >= this.rows || y >= this.cols || this.gridDFS[x][y] === 1) {
      return;
    }

    if (this.gridDFS[x][y] === 3) {
      // Found a treasure
      this.gridDFS[x][y] = 4; // Mark as found
      await this.delay();
    }

    this.gridDFS[x][y] = 1; // Mark as visited
    await this.delay();

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      await this.dfs(x + dx, y + dy);
    }
  }

  async bfs(): Promise<void> {
    const queue: [number, number][] = [this.start];
    const visited: boolean[][] = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    visited[this.start[0]][this.start[1]] = true;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      await this.delay();

      if (this.gridBFS[x][y] === 3) {
        // Found a treasure
        this.gridBFS[x][y] = 4; // Mark as found
        continue;
      }

      this.gridBFS[x][y] = 1; // Mark as visited

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < this.rows &&
          newY < this.cols &&
          !visited[newX][newY]
        ) {
          visited[newX][newY] = true;
          queue.push([newX, newY]);
        }
      }
    }
  }

  delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  startDFS(): void {
    this.dfs(this.start[0], this.start[1]);
  }

  startBFS(): void {
    this.bfs();
  }

  reset(): void {
    this.createGrid();
    this.placeTreasures();
  }
}
