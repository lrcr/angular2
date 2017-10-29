import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-component',
  templateUrl: './output-component.component.html'
})
export class OutputComponent implements OnInit {
	page : number;
  constructor() { }

  ngOnInit() {
  }
  showPage(pageNum){
  	this.page = pageNum;
  }

}
