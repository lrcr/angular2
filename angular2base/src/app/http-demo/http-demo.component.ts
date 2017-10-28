import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

interface Speakers  {
  id : string;
  name : string;
  title : string;
  photo : string;
  description : string;
}

@Component({
  selector: 'app-http-demo',
  templateUrl: './http-demo.component.html',
  styleUrls: ['./http-demo.component.css']
})

export class HttpDemoComponent implements OnInit {
  // public speakers: Speakers[] = [
  //   {id : "1", name : "aaa"},
  //   {id : "2", name : "bbb"}
  // ]; 
  public speakers: Speakers[];
  private url : string = "http://dotnetnote.com/api/WebCampService";

  constructor(private _http:Http) {
       _http.get(this.url).subscribe(r=>{
       this.speakers = r.json();
     });
  }

  ngOnInit() {
  }

  btnSave(val){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    this._http.post(this.url, JSON.stringify(val), {headers : headers}).subscribe(r=>{
      this.speakers.push(r.json());
    });
  }

}
