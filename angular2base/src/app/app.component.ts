import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
// declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '서비스';
  public courses;
  constructor(private appService: AppService, private router: Router) {
    this.courses = appService.getCourses();
  }


  openAddedRouter() {
    this.router.navigate([{ outlets: { added_router: 'chat' } }]);

    console.log(window);
  }

}

