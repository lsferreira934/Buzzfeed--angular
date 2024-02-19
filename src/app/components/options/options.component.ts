import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { options } from 'src/app/model/quizz';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  @Input() options: options[] | undefined = [];
  newOptions: options[] | undefined = [];

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    this.updateOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.updateOptions();
    }
  }

  updateOptions(): void {
    this.quizzService.currentQuestionIndex$.subscribe((index) => {
      this.quizzService.answers$.subscribe((answers) => {
        this.newOptions = this.options?.map((option) => {
          if (answers[index] && answers[index].id === option.id)
            return { ...option, selected: true };
          else return option;
        });
      });
    });
  }

  playerChose(option: options) {
    this.quizzService.submitAnswer(option);
  }
}
