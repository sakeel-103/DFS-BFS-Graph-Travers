import { Component, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements AfterViewInit {
  ngAfterViewInit() {
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          item.classList.toggle('open');
          const answer = item.querySelector<HTMLElement>('.faq-answer');
          if (answer) {
            if (item.classList.contains('open')) {
              answer.style.maxHeight = `${answer.scrollHeight}px`;
            } else {
              answer.style.maxHeight = '0';
            }
          }
        });
      }
    });
  }
}
