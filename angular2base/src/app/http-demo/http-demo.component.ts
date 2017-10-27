import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-http-demo',
  templateUrl: './http-demo.component.html',
  styleUrls: ['./http-demo.component.css']
})
export class HttpDemoComponent implements OnInit {
  public ideas: any[] = [];
  API_URI = "http://localhost:3000/";
  constructor(private _http : Http) {
    // this.ideas = [{id : '1', note : 'halo'}];
    this._http.get(this.API_URI).subscribe(r => {
      console.log(r);
      this.ideas = r.json();
    });
  }

  ngOnInit() {
  }

}
