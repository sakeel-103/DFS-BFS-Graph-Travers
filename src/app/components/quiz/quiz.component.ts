import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

@Component({
  selector: 'app-graph-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('flipped', style({ transform: 'scale(1.05)' })),
      transition('normal <=> flipped', animate('300ms ease-in-out')),
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class QuizComponent implements OnInit {
  questions: Question[] = [
    {
      text: "In a complete graph with n vertices, how many edges are there?",
      options: ["n", "n-1", "n(n-1)/2", "2^n"],
      correctAnswer: 2,
      image: "assets/complete-graph.svg"
    },
    {
      text: "What is the chromatic number of a planar graph?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2
    },
    {
      text: "In which type of graph is every vertex connected to every other vertex?",
      options: ["Tree", "Bipartite", "Complete", "Cyclic"],
      correctAnswer: 2
    },
    {
      text: "What is the maximum number of edges in a simple graph with n vertices?",
      options: ["n", "n-1", "n(n-1)/2", "n^2"],
      correctAnswer: 2
    },
    {
      text: "Which algorithm finds the shortest path between all pairs of vertices in a weighted graph?",
      options: ["Dijkstra's", "Floyd-Warshall", "Bellman-Ford", "Prim's"],
      correctAnswer: 1
    },
    {
      text: "What is the time complexity of depth-first search (DFS) for a graph represented as an adjacency list?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
      correctAnswer: 2,
      image: "assets/dfs-graph.svg"
    },
    {
      text: "In a graph with V vertices and E edges, what is the sum of all vertex degrees?",
      options: ["V", "E", "2E", "V + E"],
      correctAnswer: 2
    },
    {
      text: "What is the minimum number of colors needed to color the vertices of any planar graph so that no two adjacent vertices have the same color?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2
    },
    {
      text: "Which of the following is NOT a property of a tree?",
      options: ["Connected", "Acyclic", "Has exactly V-1 edges", "Has a unique path between any two vertices"],
      correctAnswer: 3
    },
    {
      text: "What is the maximum number of edges in a bipartite graph with m and n vertices in each partition?",
      options: ["m + n", "mn", "m * n", "2mn"],
      correctAnswer: 1,
      image: "assets/bipartite-graph.svg"
    }
  ];

  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number | null = null;
  answerSubmitted: boolean = false;
  score: number = 0;
  quizCompleted: boolean = false;
  animationState: string = 'normal';

  ngOnInit() {
    this.shuffleQuestions();
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  selectAnswer(index: number) {
    this.selectedAnswerIndex = index;
  }

  submitAnswer() {
    if (this.selectedAnswerIndex === null) return;
    
    this.answerSubmitted = true;
    this.animationState = 'flipped';

    if (this.selectedAnswerIndex === this.currentQuestion.correctAnswer) {
      this.score++;
    }

    setTimeout(() => {
      this.animationState = 'normal';
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.quizCompleted = true;
      }
    }, 1000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
    this.score = 0;
    this.quizCompleted = false;
    this.shuffleQuestions();
  }
}