import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-exp',
  templateUrl: './form-exp.component.html',
  styleUrls: ['./form-exp.component.css']
})
export class FormExpComponent implements OnInit {
  vm: DemoModel = new DemoModel();

  constructor() {
    this.vm.id = 1;
    this.vm.note = "안녕하세요";
  }

  ngOnInit() {

  }
  
  // btnSave_Click() {
  //   console.log(`note는 ${this.vm.note} 입니다`);
  // }
  btnSave_Click(note: string) {
    console.log(`note는 ${note} 입니다`);
  }

}

export class DemoModel {

  id: number;
  note: string;
}
