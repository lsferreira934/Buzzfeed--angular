import { Component, Input, OnInit } from '@angular/core';
import { options, questions } from 'src/app/model/quizz';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input()
  questionSelected: questions | undefined;

  constructor() {}

  ngOnInit(): void {}
}
