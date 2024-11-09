import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class ComparisonComponent implements OnInit {
  efficiencyChart: any;
  animateGraph = false;
  inputGraphData: any = [];
  traversalSteps: string[] = [];
  isRunningDFS = false;
  isRunningBFS = false;
  visualizationInterval: any;

  constructor() {}

  ngOnInit(): void {
    this.renderEfficiencyChart();
  }

  toggleAnimation(): void {
    this.animateGraph = !this.animateGraph;
  }

  renderEfficiencyChart(): void {
    const efficiencyData = {
      labels: ['Time Complexity', 'Space Complexity', 'Memory Usage'],
      datasets: [
        {
          label: 'DFS',
          data: [100, 80, 70],
          backgroundColor: '#ff6b6b',
        },
        {
          label: 'BFS',
          data: [100, 120, 130],
          backgroundColor: '#4ecdc4',
        },
      ],
    };

    this.efficiencyChart = new Chart('efficiencyChart', {
      type: 'bar',
      data: efficiencyData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Metrics',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Values',
            },
          },
        },
      },
    });
  }

  runDFS(): void {
    this.traversalSteps = [];
    this.isRunningDFS = true;
    const steps = [
      'Starting DFS traversal...',
      'Visited Node A',
      'Visited Node B',
      'Visited Node C',
      'DFS Traversal Complete',
    ];
    this.visualizeTraversal(steps, 'DFS');
  }

  runBFS(): void {
    this.traversalSteps = [];
    this.isRunningBFS = true;
    const steps = [
      'Starting BFS traversal...',
      'Visited Node A',
      'Visited Node D',
      'Visited Node E',
      'BFS Traversal Complete',
    ];
    this.visualizeTraversal(steps, 'BFS');
  }

  visualizeTraversal(steps: string[], algorithm: string): void {
    let stepIndex = 0;
    this.traversalSteps.push(steps[stepIndex]);
    this.visualizationInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        this.traversalSteps.push(steps[stepIndex]);
      } else {
        clearInterval(this.visualizationInterval);
        if (algorithm === 'DFS') {
          this.isRunningDFS = false;
        } else if (algorithm === 'BFS') {
          this.isRunningBFS = false;
        }
      }
    }, 1000);
  }
}
