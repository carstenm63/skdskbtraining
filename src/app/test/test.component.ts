import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer, Testfrage, TestState } from '../interfaces/TestAllgemein';
import { MenuService } from '../services/menu.service';
import { SftestService } from '../services/sftest.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  public fragen: Testfrage[] = [];
  public latest = -1;
  public isAnswered: boolean = false;
  public testState: TestState = { correct: 0, incorrect: 0, remaining: 0 };
  public Headline: string = "";
  private headlines: string[] = [
    "",
    "Allgemeine Fragen",
    "Spezifische Fragen See",
    "Spezifische Fragen Binnen",
    "Spezifische Fragen Segeln",
    "Wiederholung der Fehler"
  ]; 

  constructor(
    private testService: SftestService,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.isAnswered = false;
      let offset = !!params['offset'] ? params['offset'] : -1;
      let testSize = !!params['amount'] ? params['amount'] : -1;
      this.menuService.setMenuEntryActive(parseInt(params['nr']));
      this.testService.initTest(parseInt(params['nr']), parseInt(offset), parseInt(testSize), true);
      this.Headline = this.headlines[parseInt(params['nr'])]; 
      
    });
    
    this.testService.Question$.subscribe(data => {
      if (data !== null) {
        this.fragen.push(data);
        this.latest = this.fragen.length - 1;
      }
    });

    this.testService.TestState$.subscribe(testState => {
      this.testState = testState;
    });
  }

  public checkAnswer(answer: Answer): void {
    this.testService.addAnsewerdQuestion(this.fragen[this.latest], answer);
    this.isAnswered = true;
  }

  public next(): void {
    this.isAnswered = false;
    this.testService.nextQuestion();
  }

}
