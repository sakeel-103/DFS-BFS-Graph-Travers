import { Component } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [BrowserModule, FormsModule],
})
export class FooterComponent {
  email: string = ''; // Two-way bound input

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.email) {
      alert(`Thank you for subscribing, ${this.email}! Stay tuned for DSA updates.`);
      this.email = ''; // Clear input after submission
    }
  }
}
