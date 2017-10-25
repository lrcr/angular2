import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { MainTabComponent } from './main-tab/main-tab.component';
import { ShareTabComponent } from './share-tab/share-tab.component';
import { TalkTabComponent } from './talk-tab/talk-tab.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainTabComponent },
  { path: 'share', component: ShareTabComponent },
  { path: 'talk', component: TalkTabComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, MainTabComponent, ShareTabComponent, TalkTabComponent ],
  bootstrap: [ AppComponent ],
  providers: []
})
export class AppModule {}