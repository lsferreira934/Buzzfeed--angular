import { Component, Input, OnInit } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  results: string | undefined;

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    this.results = this.quizzService.loadQuestionnaireAnswer();
  }

  restart() {
    this.quizzService.resetQuizz();
  }
}
