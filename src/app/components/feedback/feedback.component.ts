import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Feedback {
  id: number;
  author: string;
  content: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule, RouterModule],  // <-- Include FormsModule in the imports array
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  loading: boolean = false;

  // Data model for feedback
  newFeedback = { author: '', content: '' };

  // Simplified feedbackList with only feedback (no questions)
  feedbackList: Feedback[] = [
    {
      id: 1,
      author: 'John Doe',
      content: 'Great article on Graph Traversal! I learned a lot.',
    }
  ];

  // Submit feedback method
  submitFeedback() {
    if (this.newFeedback.author && this.newFeedback.content) {
      const newFeedback: Feedback = {
        id: this.feedbackList.length + 1,
        author: this.newFeedback.author,
        content: this.newFeedback.content,
      };
      this.feedbackList.push(newFeedback);
      this.newFeedback = { author: '', content: '' }; // Reset form
    } else {
      alert('Please provide both name and feedback.');
    }
  }
}
