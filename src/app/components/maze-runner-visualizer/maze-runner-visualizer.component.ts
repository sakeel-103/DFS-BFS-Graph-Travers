// maze-runner-visualizer.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-maze-runner-visualizer',
  templateUrl: './maze-runner-visualizer.component.html',
  styleUrls: ['./maze-runner-visualizer.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, NavbarComponent],
  standalone: true,
})
export class MazeRunnerVisualizerComponent implements OnInit {
  gridDFS: number[][] = [];
  gridBFS: number[][] = [];
  rows: number = 10;
  cols: number = 10;
  start: [number, number] = [0, 0];
  end: [number, number] = [9, 9];

  ngOnInit(): void {
    this.createMaze();
  }

  createMaze(): void {
    this.gridDFS = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0)
    );
    this.gridBFS = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0)
    );
    this.gridDFS[this.start[0]][this.start[1]] = 2; // Start point
    this.gridDFS[this.end[0]][this.end[1]] = 3; // End point
    this.gridBFS[this.start[0]][this.start[1]] = 2; // Start point
    this.gridBFS[this.end[0]][this.end[1]] = 3; // End point
  }

  async dfs(x: number, y: number): Promise<boolean> {
    if (x < 0 || y < 0 || x >= this.rows || y >= this.cols || this.gridDFS[x][y] === 1) {
      return false;
    }

    if (this.gridDFS[x][y] === 3) {
      return true; // Reached end point
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
      if (await this.dfs(x + dx, y + dy)) {
        return true;
      }
    }

    return false;
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

      if (x === this.end[0] && y === this.end[1]) {
        break;
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
}
