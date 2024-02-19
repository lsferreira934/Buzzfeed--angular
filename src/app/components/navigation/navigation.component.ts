import { Component, OnInit } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private quizzService: QuizzService) {}

  isQuestionStart: boolean = false;

  ngOnInit(): void {
    this.quizzService.currentQuestionIndex$.subscribe(
      (index) => (this.isQuestionStart = index === 0 ? false : true)
    );
  }

  next() {
    this.quizzService.nextStep();
  }

  previous() {
    this.quizzService.previousStep();
  }
}
