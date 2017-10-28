# Angular2base

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
=> ng g c como-name -it -- inline-style --spec false -d
=> ng g c como-name -it -- is --spec false -d
=> ng g c como-name -it -- is --spec false
=> ng g c como-name --spec false -d


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 라우팅
- 메인 뷰 페이지에 
<base href="/"> 적용 - index.html 페이지가 루트 페이지임을 확인

- app.module.ts 에 RouterModule, (Routes) 포함 from @angular/router
  - {useHash : true}
- app.component.html <router-outlet></router-outlet>에 추가 (보통 nav쓸때 많이 씀)
- 모듈에 Router import(ActivatedRoute, Router)
접근 ex
export class exComponent implements OnInit{
  
  constructor(private route : ActivatedRoute, private router : Router){}
    id : number;
    
    ngOnInit(){
        this.id = +this.route.snapshot.params["id"];
    }
    goBack() : void{
      this.router.navigate(['/home'])
    }
}

라우팅을 통한 데이터 전달
-snapshot
  - ActivatedRoute 주입
  - this.router.snapshot.params['id']
-observable
  - ActivatedRoute 주입
  - this.route.params.map(params = > params['id'].do().subscribe())
-Resolvers
  - 컴포넌트가 로드하기 전에 가져오기
  - 라우트에 resolve: {} 섹션 구현
-url
  - let id = +router.url[1].path ;
    
라우팅 가드(Guard) => service
-Resolvers
-CanActivate = > 라우팅 param을 원하는 format으로 받고 싶을때...
-CanDeactivate => 다른경로로 바뀌기 전에 한번더 알림 ...
-CanActivateChild
-CanLoad : 비동기 라우팅 금지

ex)
exprots class RoutingViewGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(route : ActivatedRouteSnapshot): boolean{
      let id = +route.url[1].path;
      if(isNaN(id)){
        this.router.navigate(['/routinglist']);
        return false;
      }
      return true;
    }
    
}

-html에 속성으로 
[routerLink] = "['/home']"
[routerLink] = "['/home', 1]"  디렉티브로 링크 지정
-[routerLinkActive] 디렉티브로 CSS 하이라이트 줄 수 있음

{path : '', redirectTo : '', pathMatch : 'full or prefix'}
- full : 경로 매치되는 경로로 이동
- prefix : 특정 URL로 시작하는 경로로 이동

child Router 만들어서 추가도 가능

## 데이터 바인딩
- 기본 바인딩 {{}} 
- property 바인딩 : One way 바인딩
  -[속성] = '구문'
  -<img [src]='path/to/src'/>
  -요소:[src]
  -컴포넌트 속성 : [m_field]
  -디렉티브 속성 : [ngClass], [ngStyle]

- 이벤트 바인딩
  - (event name) = '메서드($event)'
  - <button (click)= ""/>
- 양방향 바인딩
  - [(ngModel)]='속성'
  - FormsModule 참조
- #이름지정
  - 특정 폼 컨트롤에 #별칭 형태로 ID속성을 지정 가능
  - <input #txtName/> = > txtName.value로 값 접근가능
  
  
## 폼 관련 지시자
  - FormsModule
    - ngForm
    - ngModel
    - ngModelGroup
  #기호를 사용하여 템플릿에서 폼의 구성요소 참조 가능
    - #frmRegister
    - #txtName, #txtEmail
    

## 서비스
- 특정 비지니스 로직을 다른 파일에서 관리
- 여러 서비스를 만들어 놓고 필요할 때 마다 가져다(inject) 사용
    - 생성자에 매개변수 수입 방식의 DI
- Shared 폴더



