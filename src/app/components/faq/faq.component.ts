import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  contentHeight?: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService, private titleService: Title) {}

  faqs: FAQ[] = [
    {
      id: 1,
      question: 'What is GraphExplorer Pro?',
      answer:
        'GraphExplorer Pro is an interactive tool designed to help users explore, learn, and visualize different graph algorithms and their real-world applications.',
      isOpen: false,
    },
    {
      id: 2,
      question: 'What graph algorithms are included?',
      answer:
        "GraphExplorer Pro covers a wide range of graph algorithms, including Depth-First Search (DFS), Breadth-First Search (BFS), Dijkstra's algorithm, and more.",
      isOpen: false,
    },
    {
      id: 3,
      question: 'How can I use the Graph Visualizer?',
      answer:
        'The Graph Visualizer allows users to experiment with different graph structures and watch algorithms traverse them step by step, providing an in-depth understanding of the processes involved.',
      isOpen: false,
    },
    {
      id: 4,
      question: 'What are the different graph types I can explore?',
      answer:
        'GraphExplorer Pro allows you to explore directed graphs, undirected graphs, weighted graphs, trees, and directed acyclic graphs (DAGs).',
      isOpen: false,
    },
    {
      id: 5,
      question: 'Is GraphExplorer Pro suitable for beginners?',
      answer:
        'Yes! GraphExplorer Pro is designed for learners of all levels, offering interactive visualizations and detailed explanations to help beginners understand the basics of graph theory.',
      isOpen: false,
    },
    {
      id: 6,
      question: 'Can I save my visualizations?',
      answer:
        'Yes, GraphExplorer Pro provides an option to save your graph visualizations so you can revisit and analyze them later.',
      isOpen: false,
    },
    {
      id: 7,
      question: 'Does GraphExplorer Pro support weighted graphs?',
      answer:
        'Yes, GraphExplorer Pro supports weighted graphs, and you can visualize how different algorithms handle weights in edges.',
      isOpen: false,
    },
    {
      id: 8,
      question: 'What platforms is GraphExplorer Pro available on?',
      answer:
        'GraphExplorer Pro is a web-based tool that works on all modern browsers, and it is compatible with desktop, tablet, and mobile devices.',
      isOpen: false,
    },
    {
      id: 9,
      question: 'How often are new features added?',
      answer:
        'We frequently update GraphExplorer Pro with new features and improvements based on user feedback. Stay tuned for updates!',
      isOpen: false,
    },
    {
      id: 10,
      question: 'Do I need to create an account to use GraphExplorer Pro?',
      answer:
        'No, you can use GraphExplorer Pro without creating an account. However, creating an account allows you to save your progress and visualizations.',
      isOpen: false,
    },
  ];
  filteredFaqs: FAQ[] = [...this.faqs]; // Start with all FAQs

  filterFAQs(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredFaqs = this.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }

  toggleAll(): void {
    const isAnyOpen = this.faqs.some((faq) => faq.isOpen);
    this.faqs.forEach((faq) => {
      faq.isOpen = !isAnyOpen; // Toggle based on current state
    });
  }

  ngOnInit(): void {
    document.title = 'GraphExplorer Pro | FAQ';
  }

  ngAfterViewInit() {
    this.faqs.forEach((faq) => {
      const element = document.getElementById(`faq${faq.id}`);
      if (element) {
        faq.contentHeight = `${element.scrollHeight + 20}px`;
      } else {
        faq.contentHeight = '0';
      }
    });
  }

  toggle(id: number): void {
    const faq = this.faqs.find((f) => f.id === id);
    if (faq) {
      faq.isOpen = !faq.isOpen; // Toggle the isOpen state
    }
  }
}
