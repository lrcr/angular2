import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab1',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent implements OnInit {
	logo_name = "Welcome";
  constructor() { }

  ngOnInit() {
  	console.log('ok');

  }

}
