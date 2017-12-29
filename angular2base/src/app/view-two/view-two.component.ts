import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-two',
  templateUrl: './view-two.component.html',
  styleUrls: ['./view-two.component.css']
})
export class ViewTwoComponent implements OnInit {
  _score = 0;
  grade = '';
  @Input()
  get score(): number {

    return this._score;
  }
  set score(v: number) {

    this._score = v;
    this.printGrade();
  }

  constructor() { }

  ngOnInit() {

  }

  printGrade() {
    if (this._score >= 90) {
      this.grade = 'A학점';
    } else if (this._score >= 80) {
      this.grade = 'B학점';
    } else {
      this.grade = '';
    }
  }

}
