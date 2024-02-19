import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { TitleComponent } from './components/title/title.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { OptionsComponent } from './components/options/options.component';
import { ResultsComponent } from './components/results/results.component';
import { QuizzService } from './services/quizz.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizzComponent,
    TitleComponent,
    QuestionnaireComponent,
    OptionsComponent,
    ResultsComponent,
    NavigationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [QuizzService],
  bootstrap: [AppComponent],
})
export class AppModule {}
