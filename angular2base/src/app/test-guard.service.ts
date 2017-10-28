import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router' ;

@Injectable()
export class TestGuardService implements CanActivate{

  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean{
    console.log("canActivate => route.url")
    console.log(route.url);
    let id = +route.url[1].path;
    
    if(isNaN(id)){
      this.router.navigate(['/routinglist']);
      return false;
    }
    return true;
  }

}
