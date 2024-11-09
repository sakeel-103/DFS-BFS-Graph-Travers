import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // <-- Import HttpClient
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Feedback {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule, RouterModule],  // <-- Include FormsModule in the imports array
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  loading: boolean = false;

  // Data model for feedback
  newFeedback = { author: '', content: '', createdAt: new Date() };

  // Array to hold feedback fetched from the backend
  feedbackList: Feedback[] = [];

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // ngOnInit lifecycle hook to fetch data when the component is initialized
  ngOnInit() {
    this.fetchFeedback();
  }

  // Fetch feedback data from the backend
  fetchFeedback() {
    this.loading = true;  // Set loading to true while fetching data
    const url = 'http://localhost:5000/api/feedback';  // Replace with your backend API endpoint

    this.http.get<Feedback[]>(url).subscribe(
      (response) => {
        // Convert createdAt to Date if necessary (in case backend sends it as string)
        this.feedbackList = response.map(feedback => ({
          ...feedback,
          createdAt: new Date(feedback.createdAt)  // Ensure createdAt is a Date object
        }));
        this.loading = false;  // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching feedback:', error);
        this.loading = false;  // Set loading to false even if there's an error
        alert('There was an error loading feedback.');
      }
    );
  }

  // Submit feedback method with POST request
  submitFeedback() {
    if (this.newFeedback.author && this.newFeedback.content) {
      const feedback: Feedback = {
        id: this.feedbackList.length + 1, // This id is just for local reference; the server should handle the id
        author: this.newFeedback.author,
        content: this.newFeedback.content,
        createdAt: this.newFeedback.createdAt
      };

      // POST request to backend to save feedback
      this.saveFeedback(feedback).subscribe(
        (response) => {
          console.log('Feedback saved:', response);
          this.feedbackList.push(feedback); // Add feedback to list after successful save
          this.newFeedback = { author: '', content: '', createdAt: new Date() }; // Reset form
        },
        (error) => {
          console.error('Error saving feedback:', error);
          alert('There was an error saving your feedback.');
        }
      );
    } else {
      alert('Please provide both name and feedback.');
    }
  }

  // Method to save feedback to the backend
  saveFeedback(feedback: Feedback): Observable<any> {
    let apiUrl = `${environment.BACKEND_API_URL}/feedback`;
    return this.http.post(apiUrl, feedback);
  }
}
