import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-child-component',
  templateUrl: './output-child.component.html',
  styleUrls: ['./output-component.component.css']
})
export class OutputChildComponent implements OnInit {
  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter();
  public pages = [1, 2, 3];
  constructor() { }

  ngOnInit() {
  }

  clickPage(page: number) {
    this.pageChanged.emit(page);
  }

}
