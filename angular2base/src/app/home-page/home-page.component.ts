import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title = "this is title";

  img = {
    src: 'https://angular.io/assets/images/logos/angular/angular.svg',
    size: 100
  }

  constructor() { }

  ngOnInit() {
  }
  goToWeb(src: string) {
    window.open(src);
  }
  selection(color) {
    console.log('#selector.value : ');
    console.log(color);

  }
  readFile(file) {
    console.log("file", file);
  }
}
