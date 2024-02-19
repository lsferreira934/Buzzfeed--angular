import { Component, OnInit } from '@angular/core';
import { questions, quizz } from 'src/app/model/quizz';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  error: string | null = null;
  quizz: quizz | undefined;
  currentQuestion: questions | undefined;

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    this.quizzService.loadQuizz();
    this.quizzService.quizz$.subscribe({
      next: (quizz: quizz) => {
        this.quizz = quizz;
        this.quizzService.currentQuestionIndex$.subscribe((index) => {
          this.currentQuestion = this.quizz?.questions[index];
        });
      },
      error: (error) =>
        (this.error =
          'Ocorreu um erro ao carregar o questionário. Por favor, tente novamente.'),
    });
  }
}
