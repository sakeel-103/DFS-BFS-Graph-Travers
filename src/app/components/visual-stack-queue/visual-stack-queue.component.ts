import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-visual-stack-queue',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent], // Add CommonModule here
  templateUrl: './visual-stack-queue.component.html',
  styleUrls: ['./visual-stack-queue.component.css'],
  animations: [
    trigger('stackAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]),
    trigger('queueAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class VisualStackQueueComponent {
  stack: string[] = [];
  queue: string[] = [];

  constructor() {}

  addToStack(item: string): void {
    this.stack.push(item);
  }

  removeFromStack(): void {
    if (this.stack.length > 0) {
      this.stack.pop();
    }
  }

  addToQueue(item: string): void {
    this.queue.push(item);
  }

  removeFromQueue(): void {
    if (this.queue.length > 0) {
      this.queue.shift();
    }
  }
}
