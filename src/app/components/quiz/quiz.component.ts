import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string; // Add difficulty level to the question
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
    { text: "In a complete graph with n vertices, how many edges are there?", options: ["n", "n-1", "n(n-1)/2", "2^n"], correctAnswer: 2, difficulty: "easy" },
    { text: "What is the chromatic number of a planar graph?", options: ["2", "3", "4", "5"], correctAnswer: 2, difficulty: "easy" },
    { text: "In which type of graph is every vertex connected to every other vertex?", options: ["Tree", "Bipartite", "Complete", "Cyclic"], correctAnswer: 2, difficulty: "easy" },
    { text: "What is the time complexity of depth-first search (DFS)?", options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"], correctAnswer: 0, difficulty: "easy" },
    { text: "What is the time complexity of breadth-first search (BFS)?", options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"], correctAnswer: 1, difficulty: "easy" },
    { text: "What is the minimum number of colors needed to color the vertices of a bipartite graph?", options: ["1", "2", "3", "4"], correctAnswer: 1, difficulty: "easy" },
    { text: "Which of the following is true about trees?", options: ["They are cyclic", "They have exactly V-1 edges", "They have multiple paths between nodes", "They can have more than one root"], correctAnswer: 1, difficulty: "easy" },
    { text: "What is a complete graph?", options: ["A graph with no edges", "A graph where every pair of vertices is connected", "A graph with a single cycle", "A disconnected graph"], correctAnswer: 1, difficulty: "easy" },
    { text: "Which algorithm can be used to check if a graph is connected?", options: ["Dijkstra's", "DFS", "BFS", "Prim's"], correctAnswer: 1, difficulty: "easy" },
    { text: "How many edges does a tree with n vertices have?", options: ["n-1", "n", "n+1", "2n"], correctAnswer: 0, difficulty: "easy" },
  ];

  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number | null = null;
  answerSubmitted: boolean = false;
  score: number = 0;
  quizCompleted: boolean = false;
  quizStarted: boolean = false; // Track whether the quiz has started
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

  startQuiz(difficulty: string) {
    this.quizStarted = true;
    this.questions = this.questions.filter(q => q.difficulty === difficulty);
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.answerSubmitted = false;
    this.score = 0;
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
