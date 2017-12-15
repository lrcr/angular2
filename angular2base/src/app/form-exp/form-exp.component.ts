import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-form-exp',
  templateUrl: './form-exp.component.html',
  styleUrls: ['./form-exp.component.css']
})

export class FormExpComponent implements OnInit {
  vm: DemoModel = new DemoModel();
  searchInput: FormControl = new FormControl('');
  birthday = new Date();
  constructor(private http: Http) {
    this.vm.id = 1;
    this.vm.note = '안녕하세요';
    this.searchInput.valueChanges
      .debounceTime(500)
      .switchMap(val => this.getHttpResponse(val))
      .subscribe(val => this.getValueFromInput(val)); // 다른 함수를 호출할 경우 ES6 문법 요구
  }

  ngOnInit() {

  }

  // btnSave_Click() {
  //   console.log(`note는 ${this.vm.note} 입니다`);
  // }
  btnSave_Click(note: string) {
    console.log(`note는 ${note} 입니다`);
  }

  getValueFromInput(val) {
    console.log(`the value is ${val}.`);
  }
  getHttpResponse(val: string): Observable<any> {
    return this.http.get('http://naver.com')
      .map(res => {
        console.log(res.json());
        return res.json();
      })
      .catch(err => {
        console.log(err);
        if (err.status === 404) {
          console.log(err);
          return Observable.of();
        }
      });
  }

}

export class DemoModel {

  id: number;
  note: string;
}
