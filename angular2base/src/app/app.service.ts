import { Injectable } from '@angular/core';

const COURSES = [
 { id: 1, title: 'Angular2' },
 { id: 2, title: 'Node.js ' },
 { id: 3, title: 'Firebase Hosting' }
];


@Injectable()
export class AppService {

 getCourses() {
  return COURSES;
 }
}

