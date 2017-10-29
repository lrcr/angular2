import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChildRouteModule } from './child-route/child-route.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* view components*/
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewOneComponent , ViewTwoComponent} from './index';
import { FormExpComponent } from './form-exp/form-exp.component';
import { HttpDemoComponent } from './http-demo/http-demo.component';
import { OutputComponent } from './output-component/output-component.component';
import { OutputChildComponent } from './output-component/output-child.component';


/*service*/
import { TestGuardService} from './test-guard.service';
import { AppService } from './app.service';

const router = [
  // {path : '', redirectTo : 'home', pathMatch : 'full'},
  // {path : '', redirectTo : 'home', pathMatch : 'prefix'},
  {path : 'home', component : HomePageComponent},
  {path : 'view/:id', component : ViewOneComponent, canActivate : [TestGuardService]},
  {path : 'form-demo', component : FormExpComponent},
  {path : 'output-demo', component : OutputComponent},
  {path : 'http-demo', component : HttpDemoComponent},
  {path : '**', redirectTo : ''}
]
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ViewOneComponent,
    ViewTwoComponent,
    FormExpComponent,
    HttpDemoComponent,
    OutputComponent,
    OutputChildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChildRouteModule,
    HttpModule,
    RouterModule.forRoot(router)
  ],
  providers: [TestGuardService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
