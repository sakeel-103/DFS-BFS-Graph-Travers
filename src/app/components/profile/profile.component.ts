import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-profile-dashboard-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ChartModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileDashboardPageComponent implements OnInit {
  user = {
    name: 'Amit Chaurasia',
    avatar: 'assets/avatar.png',
    level: 15,
    xp: 2500,
    xpToNextLevel: 5000,
    streakCount: 15,
    questionsSolved: 120,
    totalQuestions: 500,
    rank: 'Gold',
    achievements: [
      { name: 'First Milestone Reached', icon: 'trophy' },
      { name: '100 Questions Solved', icon: 'star' },
      { name: '10-Day Streak', icon: 'fire' },
    ],
    recentActivities: [
      { action: 'Solved', item: 'Depth-First Search problem', timestamp: '2 hours ago' },
      { action: 'Started learning', item: 'Dijkstra\'s Algorithm', timestamp: '1 day ago' },
      { action: 'Completed', item: 'Graph Traversal Module', timestamp: '3 days ago' },
    ],
    performanceData: {
      labels: ['Array', 'String', 'LinkedList', 'Tree', 'Graph', 'DP'],
      datasets: [{
        data: [80, 65, 75, 60, 55, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    }
  };

  progressPercentage: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.progressPercentage = (this.user.xp / this.user.xpToNextLevel) * 100;
  }
}