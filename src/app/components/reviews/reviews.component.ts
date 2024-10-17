// review.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Review {
  id: number;
  author: string;
  content: string;
  questions: Question[];
}

interface Question {
  id: number;
  author: string;
  content: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  content: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  loading: boolean = true;
  newReview: Partial<Review> = {};
  newQuestion: Partial<Question> = {};
  newReply: Partial<Reply> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    // Simulate fetching reviews from a server
    setTimeout(() => {
      this.reviews = [
        {
          id: 1,
          author: 'Alice',
          content: 'The graph traversal techniques were very insightful!',
          questions: [],
        },
      ];
      this.loading = false;
    }, 1000);
  }

  submitReview() {
    if (this.newReview.author && this.newReview.content) {
      const review: Review = {
        id: this.generateId(),
        author: this.newReview.author,
        content: this.newReview.content,
        questions: [],
      };
      this.reviews.unshift(review);
      this.newReview = {};
      this.saveToCSV();
    }
  }

  submitQuestion(reviewId: number) {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (review && this.newQuestion.author && this.newQuestion.content) {
      const question: Question = {
        id: this.generateId(),
        author: this.newQuestion.author,
        content: this.newQuestion.content,
        replies: [],
      };
      review.questions.push(question);
      this.newQuestion = {};
      this.saveToCSV();
    }
  }

  submitReply(reviewId: number, questionId: number) {
    const review = this.reviews.find((r) => r.id === reviewId);
    const question = review?.questions.find((q) => q.id === questionId);
    if (question && this.newReply.author && this.newReply.content) {
      const reply: Reply = {
        id: this.generateId(),
        author: this.newReply.author,
        content: this.newReply.content,
      };
      question.replies.push(reply);
      this.newReply = {};
      this.saveToCSV();
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  saveToCSV() {
    // In a real application, you would send this data to a backend service
    console.log('Saving to CSV:', this.reviews);
  }
}
