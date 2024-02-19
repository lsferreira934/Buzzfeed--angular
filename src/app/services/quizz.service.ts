import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { options, quizz } from '../model/quizz';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private quizz: quizz = {
    title: '',
    questions: [],
    results: {
      A: '',
      B: '',
    },
  };

  private currentQuestionIndex: number = 0;
  private answers: options[] = [];

  private quizzSubject = new BehaviorSubject<quizz>(this.quizz);
  private currentQuestionIndexSubject = new BehaviorSubject<number>(
    this.currentQuestionIndex
  );
  private answersSubject = new BehaviorSubject<options[]>(this.answers);

  quizz$ = this.quizzSubject.asObservable();
  currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();
  answers$ = this.answersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadQuizz() {
    this.http.get<quizz>('../../assets/data/quizz_questions.json').subscribe({
      next: (res) => {
        this.quizz = res;
        this.answers = [];
        this.quizzSubject.next(this.quizz);
        this.currentQuestionIndexSubject.next(0);
      },
      error: (err) => {
        console.error('Erro ao carregar o questionário:', err);
      },
    });
  }

  submitAnswer(answer: options) {
    const currentIndex = this.currentQuestionIndexSubject.getValue();
    if (this.answers[currentIndex]) {
      this.answers[currentIndex] = answer;
    } else {
      this.answers.push(answer);
    }
    this.answersSubject.next(this.answers);
  }

  nextStep() {
    const currentIndex = this.currentQuestionIndexSubject.getValue();
    if (
      (currentIndex < this.quizz.questions.length &&
        this.answers[currentIndex]) ||
      this.quizz.questions.length === this.answers.length
    ) {
      this.currentQuestionIndexSubject.next(currentIndex + 1);
    }
  }

  previousStep() {
    const currentIndex = this.currentQuestionIndexSubject.getValue();
    if (currentIndex > 0) {
      this.currentQuestionIndexSubject.next(currentIndex - 1);
    }
  }

  resetQuizz() {
    this.answers = [];
    this.currentQuestionIndex = 0;
    this.answersSubject.next(this.answers);
    this.currentQuestionIndexSubject.next(this.currentQuestionIndex);
  }

  loadQuestionnaireAnswer() {
    const response = {
      A: 0,
      B: 0,
    };
    this.answers.forEach((answer) => {
      if (answer.alias === 'A') response.A += 1;
      if (answer.alias === 'B') response.B += 1;
    });

    if (response.A > response.B) return this.quizz.results['A'];
    else return  this.quizz.results['B'];
  }
}
