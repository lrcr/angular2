import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkTabComponent } from './talk-tab.component';

describe('TalkTabComponent', () => {
  let component: TalkTabComponent;
  let fixture: ComponentFixture<TalkTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
