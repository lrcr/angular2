import { Component } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '서비스';
  public courses ;
  constructor(private appService: AppService){
  	this.courses = appService.getCourses();

  }
}
