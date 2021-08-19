import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Answer, TestAllgemein, Testfrage, TestState } from '../interfaces/TestAllgemein';

@Injectable({
  providedIn: 'root'
})
export class SftestService {

  private test: TestAllgemein;
  private questionSubject$: BehaviorSubject<Testfrage> = new BehaviorSubject<Testfrage>(null);
  private resultsSubject$: BehaviorSubject<TestState> = new BehaviorSubject<TestState>({ correct: 0, incorrect: 0, remaining: 0 });
  private testfragen: Testfrage[] = [];
  private errors: TestAllgemein = { testfrage: [] };
  private testresultate: Answer[] = [];

  constructor(
    private http: HttpClient,
    private route: Router
  ) {

    let errors: string = localStorage.getItem('errors');
    if (!!errors) {
      this.errors = JSON.parse(errors);
    } else {
      this.saveErrors();
    }
  }

  private saveErrors(): void {
    var errors = JSON.stringify(this.errors);
    localStorage.setItem('errors', errors);
  }

  public initTest(nr: number, offset: number = -1, testSize: number = -1, imagesOnly: boolean = false): void {

    let test;

    switch (nr) {
      case 1: test = this.testAllgemein$; break;
      case 2: test = this.testSpezifischSee$; break;
      case 3: test = this.testSpezifischBinnen$; break;
      case 4: test = this.testSpezifischSegeln$; break;
      default: test = this.testErrors$;
    }

    test.subscribe(data => {

      let url = this.route.parseUrl(self.location.toString());
      this.testfragen = data.testfrage;

      if (imagesOnly) {
        this.testfragen = this.testfragen.filter(frage => frage.images.length > 0);
      }


      this.resultsSubject$.next({ correct: 0, incorrect: 0, remaining: this.testfragen.length });
      let index: number;
      if (offset > -1) {
        index = this.testfragen.findIndex(item => item.number == offset);
        this.nextQuestion(index);
      } else {
        if (testSize > -1) {
          this.createTest(testSize);
        }
        this.nextQuestion();
      }

    });
  }

  private createTest(count: number): void {

    do {
      let amount = this.testfragen.length - 1;
      let random = this.getRandomInt(amount);
      this.testfragen.splice(random, 1);
    } while (this.testfragen.length > count);
    this.resultsSubject$.next({ correct: 0, incorrect: 0, remaining: this.testfragen.length });
  }

  public get testAllgemein$(): Observable<TestAllgemein> {
    return this.http.get<TestAllgemein>("assets/testfragen.json.txt");
  }

  public get testSpezifischSee$(): Observable<TestAllgemein> {
    return this.http.get<TestAllgemein>("assets/testfragen2.json.txt");
  }

  public get testSpezifischBinnen$(): Observable<TestAllgemein> {
    return this.http.get<TestAllgemein>("assets/testfragen_spez_binnen.json.txt");
  }
  public get testErrors$(): Observable<TestAllgemein> {
    return of(this.errors);
  }

  public get testSpezifischSegeln$(): Observable<TestAllgemein> {
    return this.http.get<TestAllgemein>("assets/testfragen_segeln.json.txt");
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public nextQuestion(nr: number = null): void {
    if (nr === null) {
      let amount: number = this.testfragen.length - 1;
      nr = this.getRandomInt(amount);
    }

    if (nr > -1) {
      let random = this.getRandomInt(this.testfragen[nr].answers.length);

      for (let i = 0; i < random; i++) {
        this.testfragen[nr].answers.push(this.testfragen[nr].answers.shift());
      }

      this.questionSubject$.next(this.testfragen[nr]);
    }
    else {
      this.resultsSubject$.subscribe(results => {
        this.finishTest(results);
      });
    }
  }

  public finishTest(results: TestState) {
    if (results.incorrect > 7) {
      alert("Leider nicht bestanden!");
    } else {
      alert("Herzlichen Glückwunsch!");
      self.location.href = '/pruefung/2';

    }
  }

  public get Question$(): Observable<Testfrage> {
    return this.questionSubject$.asObservable();
  }

  public addAnsewerdQuestion(testFrage: Testfrage, answer: Answer) {
    let index = this.testfragen.findIndex(data => data === testFrage);
    this.testfragen.splice(index, 1);
    this.testresultate.push(answer);
    if (!answer.valid) {
      if (!this.errors.testfrage.includes(testFrage) || this.errors.testfrage.length === 0)
        this.errors.testfrage.push(testFrage);
      this.saveErrors();
    }

    let correct = this.testresultate.filter(answer => answer.valid).length;
    let incorrect = this.testresultate.filter(answer => !answer.valid).length;
    this.resultsSubject$.next({ correct: correct, incorrect: incorrect, remaining: this.testfragen.length });

  }

  public get TestState$(): Observable<TestState> {
    return this.resultsSubject$.asObservable();
  }

}
