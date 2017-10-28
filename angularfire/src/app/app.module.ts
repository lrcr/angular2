import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/*view component*/
import { MainTabComponent, ShareTabComponent, TalkTabComponent} from './index';

const routes: Routes = [
  // { path: '**', redirectTo : ''},
  { path: 'main', component: MainTabComponent },
  { path: 'share', component: ShareTabComponent },
  { path: 'talk', component: TalkTabComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent, MainTabComponent, ShareTabComponent, TalkTabComponent ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule {}