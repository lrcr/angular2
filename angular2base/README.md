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

## Angular with TypeScript Development
- 브라우저를 사용하는 모든 앱은 BrowserModule을 불러와야 한다(p50)
- AppModule의 @NgModule - declaration 에 선언되면 어플리케이션 전역에서 사용가능
-    "     의     "     - bootstrap으로 지정된 컴포넌트가 루트컴포넌트로 렌더링 된다.(p51)
- Angular의 기본 라우팅 정책은 PathLocationStrategy / HashLocationStrategy 중 전자이다. ( p107)
  - 라우터 구성요소(p110)
  - interface Route(p115)
  - 코드로 라우팅하기 ==> navigate() , navigateByURL()  (p123)
- Shadow DOM은 컴포넌트의 캡슐화를 확실하게 보장하지만 아직 모든 브라우저에서 Shadow DOM을 지원하는 것은 아니기 때문에, Angular는 자체적으로 Shadow DOM을 구현하고 있다. 이때 가상 클래스 :host는 Shdow DOM의 시작점인 Shdow Root를 가리킨다.
(ex)
@Component({
  selector : 'seller',
  template : 'The seller of this product is Mary Lou(98%)',
  styles : [':host{ background : yellow }'
})

export class SellerComponent{
  ...
}

SellerComponent에 노란색 배경을 입히기 위해 :host를 사용했는데, 이 컴포넌트의 Shdow DOM스타일은 전역 DOM에 영향을 주지 않으며, 컴포넌트 HTML태그에 있는 ID도 전역 DOM의 ID와 중복되어도 별개로 동작한다.

##Shadow DOM
- p137~p140
- Shdow DOM은 웹 컴포넌트 표준 중 하나. 이 표준에 따르면 모든 웹 페이지는 DOM객체의 계층으로 구성되지만, Shdow DOM은 전역 DOM과 분리된 별개의 DOM계층을 구성한다. 그리고 이 Shdow DOM은 HTML문서에 포함되어 렌더링되지만, HTML문서에 해당하는 전역 DOM에서 Shdow DOM내부 엘리먼트에 접근할 수 없다.
 만약 웹 페이지에 커스텀 태그를 만들면, Shdow DOM은 이 HTML 조각을 웹 페이의 DOM에 추가하지 않고, 별개의 컴포넌트로 관리한다. 이렇게 컴포넌트를 분히라면 컴포넌트안에 적용하는 CSS스타일이 전역 DOM CSS에 영향을 주지 않으므로, 스타일이 잘못 지정되는 문제를 방지할 수 있고, 전역 DOM에서 발생하는 영향을 사전에 차단할 수 있다.

 Shdow DOM은 Chrome 브라우저에서 YouTube 영상을 열어봐도 확인할 수 있으며, Chrome 개발자 도구의 엘리먼트 탭을 열어보면 동영상 플레이어가 <video> 태그에 Shdow Root가 보이지 않으면 개발자 도구 설정의 User Agent Shadow DOM옵션을 활성화하면 됨.
 이 동영상 플레이어는 콘텐츠 영역과 수많은 조작 버튼으로 구성되지만, 이것들은 모두 Shdow Root안에 캡슐화되어 있다. 전역 DOM의 입장에서는 <video> 태그 내부에 대해서는 관여하지 않으며, <video>태그는 그 안에서 별개의 컴포넌트로 동작한다. Angular컴포넌트는 @Component어노테이션에 temlpate프로퍼티나 templateUrl프로퍼티로 HTML마크업을 정의하는데, 웹브라우저에서 지원하는 Shdow DOM을 사용하거나 브라우저가 지원하지 않아서 Angular DOM을 쓰더라도, 두 경우 모두 컴포넌트의 HTML은 전역 DOM객체에 합쳐지지 않는다. 이 내용과 관련해서 Angualr에서 지원하는 Shadow DOM 동작 방식은 몇 가지가 있는데, @Component 어노테이션의 encapsulation 프로퍼티로 설정한다. ViewEncapsulation 객체는 Component어노테이션이 선언된 '@angular/core' 패키지에 함께 있다.

  - ViewEncapsulation.Emulated - Angular 프레임워크가 제공하는 방식으로 Shdow DOM을 캡슐화한다(기본값). 이 방식에서는 HTML 엘리먼트에 속성을 추가해서 이 컴포넌트의 스타일이 전역 DOM의 스타일에 영향을 주지 않도록 한다. Chrome 개발자 도구에서 해당 컴포넌트의 HTML 마크업을 확인.
  - ViewEncapsulation.Native - 브라우저에서 지원하는 Shdow DOM을 사용한다. 이 경우에도 컴포넌트의 HTML과 스타일은 웹 페이지의 DOM과 별개로 존재한다. 이 옵션은 브라우저에서 Shdow DOM을 지원하는 것이 확실할 때만 사용해야 하며, 지원하지 않는 경우에는 에러가 발생한다. 이 방식에서 해당 컴포넌트의 스타일은 <head>로 합쳐지지 않고, 컴포넌트 안에 캡슐화된 영역에 위치한다.
  - ViewEnCapsulation.None - Shdow DOM 캡슐화를 사용하지 않으며, 컴포넌트의 모든 HTML과 스타일을 전역 웹 페이지 DOM에 포함시킨다. 이 경우에는 Shdow Host가 없기 때문에 :host셀럭터도 동작하지 않는다. 이 때 :host 셀렉터 대신 컴포넌트 자신의 셀렉터를 사용할 수 있다.
(ex)
@Component({
  ...
  styles : ['seller{ background : yellow }'
  encapsulation : ViewEncapsulation.None  
})  
## 디자인 패턴(p176)
- 비슷한 문제의 해결 방법을 재사용하기 좋은 형태로 정리한 것

## 의존성 주입(Dependency Injection)
- 객체 A가 객체 B에 의존성이 있다고 할 때, 객체 A는 객체 B의 인스턴스를 직접 생성하는 대신, B형식의 객체를 필요로 하는 다른 객체로 전달 할 수 있다.
  ###제어권 역전(Inversion of Control) 패턴(p178)
  - 애플리케이션이 프레임워크에 있는 API를 직접 사용하는 대신, 프레임워크가 객체를 만들고 애플리케이션에 전달하는 방식. Angular 프레임워크는 제어권을 갖는 주체로 동작하고 컴포넌트의 선언부에서 요구하는 객체를 직접 만들어서 전달한다.
  ###장점
  - Angular는 의존성으로 주입되는 객체를 미리 provider에 등록하고, 필요할 때 인스턴스를 생성해서 제공하는 방식을 사용하는데, 의존성 주입 패턴을 사용하면 코드의 결합도를 낮출 수 있고, 원하는 코드만 떼어내서 테스트할 수 있으며, 재사용하기 쉬운 코드를 작성하 수 있다.
  

## Injector & provider(p179~)
- Angular 애플리케이션에는 전체 모듈에서 사용하는 루트 인젝터(root Injector)가 있으며, 컴포넌트에서 객체나 기본형 변수, 컴포넌트, 서비스를 주입받으면 컴포넌트 안에도 인젝터를 따로 만든다. 프로바이더는 인젝터가 무엇을 주입해야 할지 알려주기 위해 사용하며, 프로바이더로 지정된 객체나 값을 인젝터가 생성해서 원하는 컴포넌트에 주입한다.(P182)
- Angular에서는 의존성으로 주입될 객체를 가리킬 때 토큰(tokens)을 사용하며, 토큰의 이름은 보통 주입될 객체의 타입으로 지정하기 때문에 providers : [ SomeServiceClass ] 처럼 SomeServiceClass 토큰을 사용하고 있다. 그리고 providers 프로퍼티 안에 있는 provide 프로퍼티에는 토근 이름과 같은 객체를 사용하지 않고 다른 객체나 고정된 값을 매핑할 수 도 있는데, 다른 모듈이 개발되는 동안 임시로 대체할 때 활용하기 용이.
ex) providers : [{ provide : FakeServiceName, useClass : RealServiceClassName }]
- 특정 서비스에 의존성으로 주입되는 서비스가 따로 없다면, 그 서비스는 의존성에 대한 추가 정보를 Angular에게 제공할 필요가 없기 때문에 컴포넌트 생성자에 바로 주입해서 사용하면 되고, @Injectable 어노테이션을 사용할 필요 없다. 하지만 서비스가 또 다른 의존성을 갖고 있을 때는 의존성 주입과 관련된 메타데이터를 만들기 위해 @Injectable 어노테이션을 사용해야 한다. 

  ### provider에 useFactory와 useValue 사용하기(P202)
  ex) ==Component level==
  providers : [{
    provider : ,
    useFactory : function(isTrue){
      if(isTrue){
        ..
      }else{
        ...
      }
    }, deps : ['ISTRUEVALUE']
  }]
  ==App level==
  @NgModule({
    ...
    providers : [{
      provide : 'ISTRUEVALUE', useValue : true
    }]
    ...
  })
  - useFactory와 useValue모두 Angular 기본 모듈인 @angular/core모듈 안에 정의되어 있다. useValue는 useFactory를 사용해서 구현되었으며, useFactory를 사용할 때 팩토리 함수가 하나의 표현식으로 나타낼 수 있으면서 또 다른 의존성이 아무것도 없다면 useValue를 사용해도 결과는 같다.
  
  ##불투명 토큰(Opaque Token) 사용하기
  - 위 예제에서 ISTRUEVALUE 토큰과 같이 하드코딩된 문자열을 의존성으로 주입해서 사용하고 있지만, 이 토큰의 이름이 다른 프로바이더의 이름과 겹치면 문제가 생길 수 있다. 이런 경우에는 문자열을 그대로 사용하는 대신 OpaqueToken 클래스를 사용하는 것이 더 좋다.
  (ex) import { OpaqueToken } from '@angular/core';

  export const ServerUrl = new OpaqueToken('SeverUrl');

  @Component({
    ...
  })

  class AppComponent{
    constructor (@Inject(BackendUrl) public url){
      ...
    }
  }

  @NgModule({
    ...
    providers : [{
      provide : ServerUrl, useValue : 'myServer.com'
    }]

  })

  ###인젝터의 계층 구조(p209)
  - Angular 애플리케이션은 컴포넌트의 계층으로 구성된다. 웹 페이지를 불러올 때 Angular루트 인젝터를 사용해서 애플리케이션 객체를 생성하며, 이 인젝터는 생성된 애플리케이션의 구조를 따라가면서 컴포넌트의 계층을 만들고 컴포넌트 인젝터를 생성한다.
   애플리케이션의 루트 컴포넌트는 언제나 다른 컴포넌트를 자식으로 갖는다. 또, 컴포넌트 A의 템플릿에 컴포넌트 B가 사용되었다면, 컴포넌트 A도 컴포넌트 B의 부모 컴포넌트가 된다.
   컴포넌트가 생성될 때 의존성으로 주입되는 객체가 있다면, 컴포넌트의 인젝터는 먼저 컴포넌트 계층에 프로바이더가 등록되어 있는지 찾는다. 컴포넌트에서 적절한 프로바이더를 찾았다면 컴포넌트의 인젝터가 그 프로바이더를 사용하며, 프로바이더를 찾았다면 컴포넌트의 인젝터가 그 프로바이더를 사용하며, 프로바이더를 찾지 못했다면 부모 컴포넌트에 프로바이더가 있는지 찾는다. 부모를 따라가며 프로바이더를 찾다가 어디에서도 적절한 프로바이더를 찾지 못하면 에러가 발생한다.
  ### viewProviders(p212)
  - 자식 컴포넌트나 외부 컴포넌트를 배제하고, 등록하는 계층에서만 프로바이더를 사용하려면 providers 프로퍼티 대신 viewProviders 프로퍼티를 사용한다. 이 방식은 자식컴포넌트에 영향을 주지 않고 현재 작업하고 있는 컴포넌트에만 프로바이더를 따로 적용할 때 사용한다.

##Javascript 호이스팅과 클래스(p202)
- 클래스 선언은 보통 개별 파일에서 하며 , 각 파일의 제일 처음에는 import 키워드로 외부 파일을 불러오기 때문에 클래스 선언은 그 다음이 된다. 하지만 클래스 선언은 호이스팅되지 않기 때문에 한 파일에서 클래스를 여러개 선언한다면 특정서비스나 그에 의존적인(해당서비스를 상속받는) 서비스를 사용하는 컴포넌트 보다 먼저 정의되어야 한다. 이와 반대로, 객체가 주입되는 시점보다 객체 정의가 나중이라면, @inject 어노테이션에 forwardRef()함수를 사용해야 한다. Angular 가이드 문서에서 forwardRef() 페이지(http://mng.bz/31YN) 참고

** 호이스트란, 변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것을 의미합니다. 즉, 변수가 함수내에서 정의되었을 경우 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우는 전역 컨텍스트의 최상위로 변경됩니다.



## 라우팅
- 메인 뷰 페이지에 <base href="/"> 적용 => index.html 페이지가 루트 페이지임을 확인
- app.module.ts 에 RouterModule, (Routes) 포함 from @angular/router
  - {useHash : true}
- app.component.html <router-outlet></router-outlet>에 추가 (보통 nav쓸때 많이 씀)
- 여러개의 라우터 추가 가능
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

라우팅 가드(Guard) => service !!
- 라우터를 통해 내비게이션을 하거나 라우터에서 빠져나갈 때 이 시점을 가로채서 특정 동작을 수행할 수 있으며, 라우팅 가드를 사용해서 라우팅 동작을 막을 수 있다. 
    - 사용자 인증을 한 후에만 라우팅을 수행하고, 인증을 하지 않았다면 인증을 하게 한다.
    - 컴포넌트 몇 개로 만든 폼을 화면에 표시하고, 이 폼에 유효한 데이터를 입력한 경우에만 내비게이션을 허용한다.
    - 라우터에서 빠져나갈 때 저장하지 않은 정보가 있는 것을 사용자에게 알린다.
-Resolvers
-CanActivate = > 라우팅 param을 원하는 format으로 받고 싶을때...(true를 반환할 때만 라우터가 동작)
-CanDeactivate => 다른경로로 바뀌기 전에 한번더 알림 ...(true를 반환해야지만 라우터의 네비게이션에서 벗어남)
  - CanActivate/CanDeactivate 프로퍼티는 배열을 받을 수 도 있는데, 유효성을 확인하는 함수가 여러 개일 때 사용
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

- html에 속성으로
[routerLink] = "['/home']"
[routerLink] = "['/home', 1]"  디렉티브로 링크 지정
- [routerLinkActive] 디렉티브로 CSS 하이라이트 줄 수 있음

{ 
  path : '',
  redirectTo : '',
  pathMatch : 'full or prefix',
  data: [{ key : value}],
  children : [{
    path : ...., 
    compoent : ....
  }],
}

- full : 경로 매치되는 경로로 이동
- prefix : 특정 URL로 시작하는 경로로 이동
- data : 정적 데이터 전달할 경우
interface Route(p115) 참고

** child Router 만들어서 추가도 가능
** 새로운 모듈을 사용할 경우 Router 통합
** <router-oulet></router-oulet> 여러개 추가 가능
** loadChildren = > lazyLoading(로딩 지연시키기...) SPA에서 페이지 렌더링시 바로 모든 리소스를 불러들이지 않고, 해당 부분이 필요할 때 로딩하는 방법 => 성능

## 데이터 바인딩
 ** 브라우저는 HTML 문서를 파싱해서 DOM 트리를 구성하며, DOM트리 구성이 완료되면 DOM객체의 프로퍼티를 주로 사용해서 동작.(P232)
- 기본 바인딩 {{}}
- property 바인딩 : One way 바인딩
  -[속성] = '구문'
  -<img [src]='path/to/src'/>
  -요소:[src]
  -컴포넌트 속성 : [m_field]
  -디렉티브 속성 : [ngClass], [ngStyle]
  ** [hidden] => Explorer 10에서는 안먹힘

- 이벤트 바인딩
  - (event name) = '메서드($event)'
  - <button (click)= ""/>
- 양방향 바인딩
  - [(ngModel)]='속성'
  - FormsModule 참조
- #이름지정
  - 특정 폼 컨트롤에 #별칭 형태로 ID속성을 지정 가능
  - <input #txtName/> = > txtName.value로 값 접근가능

  ### AngularJS에서 사용한 양방향 바인딩의 문제(P227)
  - AngularJS에서는 데이터가 변경되면 뷰가 자동으로 갱신되고, 반대로 뷰가 변경되어도 데이터가 자동으로 갱신된다. AngularJS의 이런 발식을 양방향 데이터 바인딩이라 한다. 양방향 데이터 바인딩은 개발자가 작성해야 하는 코드의 양을 상당히 줄여주기는 하지만, 애플리케이션이 커지고 바인딩되는 객체가 많아질수록 성능이 심각하게 나빠지는 단점이 있다. AngularJS 프레임워크가 페이지에 있는 데이터 바인딩 표현식을 모두 모아 관리하고, 브라우저에서 이벤트가 발생할 때 이 목록에 있는 값을 모두 검사하는데, 모든 값이 동기화될 때까지 이 검사를 반복하기 때문이다. 이 과정 증에 어떤 값은 여러 번 갱신되는 경우도 있었다.
  - AngularJS에서는 양방향 바인딩이 기본 방식이었고, 간단하고 쉬운 문법으로 뷰와 모델을 동기화 할 수 있었다. 하지만 화면에 컨트롤이 많아지면 한 곳에서 값이 변경될 때 바인딩된 값들이 연쇄적으로 갱신되기 때문에 성능이 급격히 나빠지는 문제가 있었다.
  게다가 이런 방식의 양방향 바인딩은 모델의 값이 변하는 이유가 너무 다양했기 때문에 디버깅을 하기도 어려웠다. 사용자가 입력을 해서 값이 바뀐 것인지, 어떤 변수가 바뀌어서 이 값도 바뀐 것인지 알 수가 없었다.
  하지만 Angular 프레임워크의 변화 감지 매커니즘은 간단하다. 데이터 흐름이 단방향이기 때문에 어떤 값이 변화할 때 화면에서 어떤 엘리먼트가 변경되어야 하는지 명확하고, 컴포넌트의 프로퍼티 값이 어디에서 왔는지도 분명하게 알 수 있다. 컴포넌트 코드에 있는 프로퍼티 하나는 언제나 하나의 엘리먼트에만 영향을 준다.(P246)

- 템플릿 바인딩(P237)
HTML <template> 태그는 일반적으로 사용되는 태그가 아니며, 스크립트를 실행해서 이 태그의 내용을 파싱하고 DOM 트리에 추가하지 않는 한, 이 태그의 내용은 브라우저에서 무시된다. <template> 태그에 태그에 대해서는 Mozila 개발자 네트워크 문서 참고. 그리고 구조 디렉티브를 사용할 때 축약 문법을 사용할 수 있는데, 이 문법은 애스터리스트(*)로 시작해서 *ngFor와 같이 사용한다. Angular의 파서가 애스터리스크로 시작하는 디렉티브를 만나면, 브라우저가 이해할 수 있는 <template>태크를 사용해서 이 디렉티브를 HTML조각으로 변환한다.
 Angular4.0.0부터는 <template> 태그가 <ng-template> 으로 변경되었기 때문에, <template> 태그를 사용하면 콘솔에 경고 메세지가 출력된다. 그래서 Angular4.0.0 이후 버전에서 <template> 태그를 사용해야 한다면 <ng-template> 태그로 사용
ex)
<span *ngIf = "flag"> ... </span> == > <ng-template [ngIf="flag"]> ... </ng-template>

##반응형 프로그래밍과 옵저버블(P246)
- 반응형 프로그래밍은 옵저버블 이벤트 스트림을 구독하고, 이 스트림에 반응하는 방식으로 동작하는 애플리케이션을 만드는 것을 의미한다. 프로그래밍 분야에서 옵저버/옵저버블은 이미 널리 알려진 패턴이며, 비동기 처리를 하는 어떤 경우에도 잘 어울린다. 여기에 반응형 프로그래밍 패턴은 옵저버/옵저버블 패턴에서 좀 더 심화된 패턴이다. 옵저버블 스트림은 취소할 수 있으며, 스트림이 끝나는 지점을 알릴 수 있고, 구독자에게 전달된 데이터를 다양한 함수로 변화해서 다른 구독자에게 전달할 수도 있다.
- 옵저버블 패턴의 특징은 데이터 처리에 밀어 넣는 방식(Push model)을 택했다는 것이다. 반대로 받아오는 방식(Pull model)은 배열을 돌거나, Iterable 객체를 사용하거나, ES6 제너레이터 함수를 통해 구현한다. 전달된 데이터에 반응할 것인지, 데이터를 직접 받아올 것인지의 차이다.
- 옵저버블 스트림을 지원하는 라이브러리들은 이미 많이 구현된 상태. RxJS도 그중 하나이다. 그리고 RxJS 라이브러리는 Angular 내부에 통합되어 있기 때문에, Angular 프레임워크 로직과 같이 사용해도 전혀 어색하지 않다.
  ### 옵저버와 옵저버블(P247)
  - 옵저버블은 연속된 데이터 스트림을 생성하는 객체이며, 옵저버는 이 스트림을 구독해서 사용하는 객체다. 만약 A 객체에서 데이터 스트림을 생성하고 B객체에서 이 스트림을 구독한다면, A 객체가 옵저버블이고 B객체는 옵저버다.
  - 옵저버블은 콜드 옵저버블과 핫 옵저버블 두가지가 있다. 콜드 옵저버블은 구독자가 있는 경우에만 스트리밍 데이터를 만들기 시작하고, 핫 옵저버블은 데이터를 받는 구독자가 없더라도 데이터를 스트리밍한다.
  - 옵저버블은 소켓이나 배열, 화면에서 발생한 이벤트 등과 같은 데이터 소스를 한 번에 하나씩, 연속으로 보내는 (스트리밍)객체다. 좀 더 자세히 보면, 옵저버블 스트림은 다음 세 가지 경우를 처리할 수 있다.
    1. 다음 엘리먼트를 전달한다.
    2. 에러를 전달한다.
    3. 스트리밍이 종료되었다는 신호를 전달한다.
  따라서, 옵저버 객체는 세 가지 콜백 함수를 가질 수 있다.
    1. 다음 엘리먼트를 받았을 때 처리하는 함수
    2. 에러를 받았을 때 처리하는 함수
    3. 데이터 스트림이 끝났을 때 실행하는 함수
  ex) [옵저버블] ====data streaming ====> map() : data 변환 ====> filter() : 원하는 데이터 선택 ===> 구독자 

  ###배열을 이터러블(Iteralbes)이나 옵저버블로 만들기
  JavaScript는 배열을 처리하는 함수를 다양하게 제공하는대, 자주 사용하는 함수는 다음과 같다.
  1. map() : 배열의 각 항목마다 함수를 실행한다. map()함수를 사용하면 배열의 크기가 바뀌는 것에 신경쓰지 않고 각 항목의 값이나 형태를 변경할 수 있다.
  2. filter() : 배열의 각 항목 중에 조건에 만족하지 않는 항목을 걸러낸다. 반환되는 배열의 길이는 원래 배열보다 짧거나 같다.
  3. reduce() : 배열의 각 항목의 값을 종합하고 하나의 값을 반환한다. 배열의 값을 모두 더하거나 모두 곱하는 기능을 구현할 때 사용된다.
  - 스트림은 애플리케이션에 전달되는 데이터 콜렉션이다. 그리고 이터러블과 어터레이터 개념은 ES6에도 도입되었기 때문에, 이 개념을 이용하면 배열을 데이터 콜렉션으로 간주하고 스트림과 비슷하게 한 번에 한 엘리먼트씩 처리할 수 있다.
  - 이터버를 데이터가 꼭 배열일 필요는 없다. ES6의 제너레이터 함수를 사용하면 어떠한 객체라도 이터레이터로 참조할 수 있으며, 데이터를 한 번에 하나씩 가져올 수 있다. 이터레이터로 가져온 엘리먼트 하나를 처리하고, 다음 항목으로 넘어가면서 이 로직을 반복하는 방식이다.
  - 옵저버블 객체는 이터레이터를 좀 더 개선한 것이다. 이터레이터는 데이터를 직접 가져오는 방식이지만, 옵저버블은 구독자에게 전달된 데이터에 반응하는 방식이다.

- 구독자가 스트림을 구독하는 것은 스트림 발행자에게 스트림을 받고 싶다고 알리는 것이다. 구독자는 스트림을 구독하는 동안 스트림 엘리먼트를 받고 이에 반응해서 함수를 실행하며, 에러를 처리하거나 스트림이 종료되었을 때 필요한 동작도 할 수 있다. 그리고 subscribe() 함수에 다른 함수를 체이닝해서 사용할 수도 있다.
- 옵저버블 구독 취소하기(p259) => swithMap() 함수 사용해서 이전 요청이 완료되지 않더라도 취소, 옵저버블 변환하는 역할
- subscribe(function(res){}, funtion(err){}, function(){//스트리밍 종료})

## 파이프(p266)
  - 파이프는 어떤 값의 형태를 바꿀 때 사용하는 템플릿 엘리먼트다. 파이프는 기호를 사용하며, 파이프 기호 뒤에 원하는 형식의 파이프 이름을 명시하면 된다.
  - uppercase, date, currency, json, async => 옵저버블 스티림을 엘리먼트로 풀어서 표시

  ### 커스텀파이프
  - Angular에서 제공하는 파이프 외에도, 원하는 동작을 하는 커스텀 파이프를 직접 만들 수 있다. 클래스에 @Pipe 어노테이션을 추가하고 PipeTransform 인터페이스를 사용해서 클래스를 작성하면 됨. PipeTransForm 인터페이스 참조.

## 컴포넌트 통신(P281)
- Angular 애플리케이션은 컴포넌트의 계층 구조이다.
- 부모 컴포넌트에서 보내는 데이터는 @Input 데코레이터로 지정한 입력 프로퍼티로 받는다. 입력 프로퍼티의 값이 변경되는 시점을 알려면 setter를 사용하는 것이다. 그리고 private로 접근변수를 지정하여 해당 변수로 접근하는 로직은 케터와 세터를 통해 연결된다.
- 컴포넌트는 EventEmitter 객체를 사용해서 커스텀 이벤트를 발생시킬 수 있는데, 이렇게 발생된 이벤트는 이벤트가 발생한 컴포넌트 안에서 처리하거나 부모 계층에서 처리할 수 있다. EventEmitter는 RxJS로 구현된 Subject 클래스의 서브 클래스이며, 옵저버블과 옵저버를 지원한다. 다른말로 하면, EventEmitter의 emit()함수를 사용해서 커스텀 이벤트를 옵저버블 스트림으로 발생시킬 수 있고, 이 클래스의 subscribe() 함수로 옵저버블 스트림을 구독해서 처리할 수 있다.
 컴포넌트 외부로 커스텀 이벤트를 보내려면 @Output() 어노테이션을 사용해서 출력 프로퍼티를 지정하고, EventEmitter 객체의 emit() 함수를 실행하면서 이벤트 정보를 함께 전달하면 된다.
  ### 이벤트 버블링(P293)
  - @Output 어노테이션으로 바인딩 된 커스텀 이벤트가 발생한 컴포넌트의 부모 계층에서 이벤트를 받으려고 하면 이벤트가 올라오지 않는다.
  어플리케이션에 이벤트 버블링이 꼭 필요하다면, EventEmitter를 사용하지 말고 네이티브 DOM이벤트를 사용해야 한다. 
  ex)
  import { ElementRef } from '@angular/core';

  @Component{}

  export class Something{
    ...

    constructor(element : ElementRef){
      ..
      element.nativeElement
        .dispatchEvent(new CustomEvent('my-custom-event', {
          key1 : val1,
          key2 : val2
        }))
    }
  }
  - 위 코드에서는 ElementRef를 사용해서 컴포넌트에 DOM엘리먼트를 주입하고, 이 엘리먼트의 element.nativeElement.dispatchEvent() 함수를 사용해서 커스텀 이벤트를 보낸다. 이렇게 하면 원하는 대로 이벤트 버블링을 구현할 수 있지만 일부 브라우저에서는 동작하지 않을 수 있으며, 특히 HTML렌더러를 사용하지 않는 브라우저에서는 동작하지 않을 수 있다.

  ### 자식 컴포넌트의 API직접 실행하기(P325)
  - 부모 컴포넌트에서 자식 컴포넌트의 API를 직접 호출하는 방식이 더 나을 수 있다. 자식 컴포넌트에 greet()이라는 함수가 있고, 부모 컴포넌트에서 이 함수를 실행한다고 하자. 두 가지 방법을 살펴보기 위해 자식 컴포넌트는 두 개의 인스턴스로 만들고, 각 인스턴스에 템플릿 변수를 지정한다.

  <child #child1></child>
  <child #child2></child>
  
  이제 부모 컴포넌트에서 @ViewChild어노테이션(@angular/core)을 사용해서 변수를 선언한다. 이 어노테이션은 자식 컴포넌트를 가리키기 위해 사용되며, 첫 번째 자식 컴포넌트는 다음과 같이 참조할 수 있다.

  @ViewChild('child1')
  firstChild : ChildComponent;
  ...
  this.firstChild.greet('Child1');

  위 코드는 자식 컴포넌트 중에 child1이라는 템플릿 변수를 갖는 컴포넌트를 찾아서 firstChild라는 변수로 할당하고, 자식 컴포넌트의 함수를 직접 실행하는 내용이다. 또 다른 방법은 컴포넌트 코드를 사용하지 않고 부모 컴포넌트의 템플릿에서 접근하는 방법이다.

  <button (click)="child2.greet('Child2')">자식2에서 greet()실행 </button>

  ###생명주기를 가로채는 함수에서 UI갱신하기(P329)
  - 위처럼 자식 컴포넌트의 API를 사용할 때 자식 컴포넌트의 greet() 함수가 화면을 변경하지 않으면 이 코드는 문제가 없지만, 이 함수에서 ngAfterViewInit() 함수가 실행되기 전에 화면을 변경하려고 하면 에러가 발생한다. 부모 컴포넌트의 ngAfterViewInit()함수와 자식 컴포넌트의 ngAfterViewInit()함수는 같은 이벤트 루프안에서 실행되는데, ngAfterViewInit()함수가 끝난 이후에야 화면이 렌더링되기 때문이다.

  이 문제를 해결하는 방법은 두 가지가 있다. Angular가 바인딩 검사를 추가로 하지 않는 운영 모드에서 애플리케이션을 실행하거나, setTimeout()함수를 사용해서 다음 이벤트 루프에서 화면을 갱신하면 된다.

  ### 프로젝션(P303)
  - Angular는 부모 컴포넌트 템플릿의 일부분을 자식 컴포넌트 템플릿에 넣을 수 있는 기능을 제공하며, ngContent 디렉티브를 사용한다. 이 기능은 AngularJS에서는 트랜스클루전(transclusion)이라고 했지만, 프로젝션(Projection)이라는 용어로 변경되었다.
   1. 자식 컴포넌트 템플릿에 <ng-content>태그를 추가해서 부모 컴포넌트가 보내는 템플릿이 위치할 곳을 지정한다. 라우터를 사용할 때 <router-outlet>을 지정하는 것과 비슷하다.
   2. 부모 컴포넌트에서는 자식 컴포넌트 태그 안쪽에 원하는 내용을 넣는다. 자식 컴포넌트를 표현하는 태그가 <my-child>라면 이 태그 안쪽에 있는 <div> 태그가 자식 컴포넌트로 전달된다.
  -재미있는 점은, 템플릿 정의는 부모 컴포넌트에서 하지만 렌더링은 자식 컴포넌트에서 한다는 것이다. 
    
    #### 여러 구역에 프로젝션하기(P308)
    - 컴포넌트 템플릿에는 <ng-conntent> 태그를 여러 개 사용할 수 있다. 자식 컴포넌트가 header, content, footer 영역으로 나뉘어 있는데, content영역은 자식 컴포넌트에서 정의하지만 header와 footer가 들어가는 HTML마크업은 부모 컴포넌트에서 전달한다고 하자. 이렇게 구현하려면 자식 컴포넌트 템플릿에는 header와 footer가 렌더링될 위치마다 하나씩, <ng-content>태그를 2개 사용해야 한다. 이 때 header와 footer를 구분하기 위해 select 어트리뷰트를 사용하는데, 이 어트리뷰트 값에는 셀렉터를 자유롭게 지정할 수 있다. 

    ex)
    @Component({
      selector : 'child',
      template : `
        <div class="child">
          <h2>Child</h2>
          <ng-content select=".header"></ng-content>
          <div>This content is defined in child</div>
          <ng-content> select=".footer"></ng-content>
        </div>
      `
    })
    class ChildComponent{}

    @Component({
      selector : 'app',
      template : `
        <div class="app">
          <h2>Parent</h2>
          <div>This div is defined in the Parent's template</div>
          <child>
            <div class="header">Child got this header from parent</div>
            <div class="footer">Child got this footer from parent</div>
          </child>
        </div>
      `
    })
    class AppComponent{}

    #### innerHTML로 직접 바인딩하기
    - 컴포넌트 프로퍼티에 HTML조각을 저장하고 있다면, 이 내용을 컴포넌트 템플릿의 innerHTML 프로퍼티로 직접 바인딩할 수도 있다.
    <p [innerHTML] = "myComponentProperty"></p>
    하지만 innerHTML을 바인딩하는 것보다는 ngContent를 사용하는 것이 좋다.
    - innerHTML은 브라우저에 따라 동작하지 않을 수 있다. ngContent는 Angular에서 제공하는 기능이다.
    - ngContent를 사용하면 여러 구역에 나뉘어 전달된 HTML을 한 번에 지정할 수 있다.
    - ngContent를 사용하면 부모 컴포넌트의 프로퍼티를 HTML에 실어 전달할 수 있다.
  
  ## 컴포넌트 생명주기(P312)
  - Angular 컴포넌트는 생명주기를 거치는 동안 많은 이벤트가 발생한다. 먼저, 컴포넌트가 생성되면 Angular 변화 감지기가 컴포넌트를 모니터링하기 시작한다. 그리고 나면 컴포넌트가 초기화되고, DOM에 추가되고, 사용자가 볼 수 있게 렌더링되며, 컴포넌트의 상태나 내부의 프로퍼티 값이 변경되면 UI를 다시 렌더링하고, 마지막으로 컴포넌트가 종료된다. 사용자는 컴포넌트의 초기화가 끝난 이후부터 화면에서 컴포넌트를 볼 수 있으며, 컴포넌트가 화면에 표시된 이후에는 컴포넌트의 프로퍼티 값과 화면의 값이 변화 감지기에 의해 동기화된 상태로 유지된다. 라우터에서 화면을 전환하거나 ngIf와 같은 구조 디렉티브에 의해 컴포넌트가 DOM트리에서 제거되면 컴포넌트가 종료된다.
  컴포넌트의 생성자 함수는 컴포넌트가 생성될 때 한 번만 실행되며, 컴포넌트의 프로퍼티는 이 단계에서 아직 초기화되지 않는다. 컴포넌트의 생명주기를 가로채서 원하는 동작을 하려면, Angular가 제공하는 다음과 같은 함수들을 사용하면 된다.

   - ngOnChanges() : 부모 컴포넌트에서 자식 컴포넌트의 입력 프로퍼티로 바인딩된 값이 변경되거나, 프로퍼티 값이 초기화될 때 실행되고, 컴포넌트에 입력 프로퍼티가 없으면 실행되지 않는다. 변화 감지 알고리즘을 따로 만들어서 사용하고 싶다면 이 알고리즘을 DoCheck() 함수로 구현할 수 있지만, 모든 변화 감지 사이클마다 DoCheck()함수를 실행하기 때문에 성능에 나쁜 영향을 줄 수 있다.

   - ngOnInit(): 프로퍼티 값을 초기화하려고 ngOnChanges()가 처음 실행된 뒤에 실행된다. 컴포넌트 생성자 함수에서 변수들을 초기화한다고 해도, 생성자 함수가 실행되는 시점에는 프로퍼티들이 아직 생성되지 않지만, ngOnInit()이 실행되는 시점은 컴포넌트 프로퍼티들이 생성되어 초기화되고 난 이후다.
   
   - ngAfterContentInit(): ngContent 디렉티브를 사용해서 자식 컴포넌트에 HTML조각을 전달하면, 자식 컴포넌트가 초기화 된 이후에 실행된다.

   - ngAfterContentChecked(): ngContent 디렉티브를 통해 부모 컴포넌트에서 HTML조각을 받은 직후에 자식 컴포넌트 쪽에서 실행된다. ngContent에 바인딩된 항목이 있으면 이 항목의 값이 변경된 경우에도 실행된다.

   - ngAfterViewInit() : 컴포넌트 템플릿의 바인딩이 완료된 후에 실행된다. 부모 컴포넌트가 먼저 초기화되고, 그 다음 자식 컴포넌트가 초기화되기 때문에, 이 함수는 자식 컴포넌트들이 모두 준비된 후에 실행된다.
   
   - ngAfterViewChecked(): 컴포넌트 템플릿에 바인딩된 항목의 값이 변경되면 실행된다. 이 함수는 컴포넌트 내부나 외부에서 발생한 변경 사항을 반영하기 위해 여러 번 호출될 수 있다.

   - 생명주기 콜백 함수 이름에 Content가 들어간 항목은 <ng-content> 디렉티브를 사용하는 경우에만 실행되며, 함수 이름에 View가 들어간 항목은 컴포넌트 텐플릿과 관련된 것이다. Checked는 컴포넌트와 DOM이 동기화된 직후를 뜻한다.

   ###생성자에 코드를 작성하지 말아야 하는 경우(p314)
    - 생성자 안에서 실행되는 함수가 컴포넌트의 프로퍼티를 사용해야 한다면, 그 함수는 해당 컴포넌트의 모든 프로퍼티가 초기화되고 난 직후인 ngOnInit()으로 옮겨져야 한다. 그리고 생성자의 코드를 가볍게 유지하기 위해, 실행 시간이 많이 걸리는 함수들은 ngOnInit()에서 실행하는 것이 좋다.

    - 생명주기 함수들은 ng라는 접두사를 생략한 함수명과 같은 이름의 인터페이스로 정의되어 있다. 예를 들어 ngOnChanges() 콜백 함수를 사용하려면 클래스 선언에 implements OnChanges를 추가해야 한다.


  ###뮤터블(mutable) vs 이뮤터블(immutable) 
    - 자바스크립트 문자열은 이뮤터블이며, 메모리에 생성되어 절대 변경되지 않는다.
    ex) var greeting = "Hello";
        greeting = "Hello Mary";

    첫 번째 줄이 실행되면 메모리에 "Hello"라는 문자열이 생성된다. 그리고 두 번째 줄이 실행되면 원래 있던 문자열을 수정하는 것이 아니라 "Hello Mary"라는 새로운 문자열을 만들고 greeting 변수에 할당한다. 두 번째 줄의 실행이 끝나도 두 문자열은 모두 메모리에 있고, 각각은 이뮤터블이다. greeting 변수의 입장에서는 이전 문자열의 주소를 참조하고 있다가 다른 문자열을 참조하도록 변경된다.
    반면에 자바스크립트 객체는 뮤터블이고, 메모리의 어떤 위치에 인스턴스가 생성되어 있다가 프로퍼티가 변경되면 이 객체의 프로퍼티 값이 직접 변경된다.

    - @Input 어노테이션으로 지정된 문자열 변수가 변경될 때는 ngOnChanges() 함수가 실행되지만, 객체 안에 프로퍼티가 변경된 경우에는 ngOnChanges()함수가 실행되지 않는다. but 참조하고 있는 

    - @angular/core 모듈의 SimpleChange 클래스를 사용하면 new SimpleChange().change.isFirstChange() 함수를 사용하면 이 객체의 값이 처음 할당된 갓인지 업데이트되는 것인지도 판단할 수 있다. 
    
   ###운영 모드 활성화하기(p320)
   - 운영 모드에서는 실행되는 코드의 유효성을 프레임워크가 검증한 후에 코드가 실행된다. 그리고 변화 감지 동작이 또 다른 변화를 발생시키지 않도록 막는 기능도 운영 모드에서는 동작하지 않는다. 운영 모드가 활성화되면 개발 단계에서 프레임워크가 수행하던 유효성 검증 로직이 일부 생략되기 때문에 애플리케이션의 성능은 약간 향상된다. 운영 모드를 활성화할려면 bootstrap()함수를 실행하기 전에 enableProdMode() 함수를 실행하면 된다.

   ### 변화 감지기 동작 원리(p322)
    - Angular의 변화 감지기는 Zone(zone.js) 라이브러리를 사용해서 구현되었으며, 컴포넌트 프로퍼티의 값과 UI의 상태를 동기화하기 위해 만들어졌다. 브라우저에서 사용자가 버튼을 클릭하거나 서버에서 데이터를 받는 경우, setTimeOut()함수로 스크립트가 실행될 때와 같이 비동기 이벤트가 발생하면 변화 감지 동작이 시작된다. 변화 감지 사이클이 시작되면 컴포넌트 템플릿에 바인딩된 값을 모두 검사한다. 그리고 컴포넌트 프로퍼티 값이 바뀌었으면, 바인딩된 표현식을 다시 실행하고 화면을 갱신한다. Angular가 컴포넌트 템플릿을 생성하면 각 컴포넌트에는 독립적인 변화 감지기가 만들어진다. 그리고 변화 감지 사이클이 시작되면 최상위 컴포넌트부터 시작해서 각각의 컴포넌트를 검색하면서 어떤 컴포넌트의 UI가 갱신되어야 하는지 판단한다. 변화 감지 정책은 Default와 OnPush가 있다. 모든 컴포넌트가 기본값인 Default 정책을 사용한다면 컴포넌트 트리 전체를 돌면서 컴포넌트가 변경되었는지 검사한다. 반면에 자식 컴포넌트에서 OnPush 정책을 사용하면 자식 컴포넌트에서 그 아래 계층은 컴포넌트가 변경되었는지 검사하지 않으며, 부모 컴포넌트에서 자식 컴포넌트에 바인딩한 프로퍼티가 변경되었다면 자식 컴포넌트까지만 검사한다. OnPush 정책을 사용하려면 컴포넌트 어노테이션 다음 내용을 추가하면 된다.
    => changeDetection : ChangeDetectionStrategy.OnPush                       

## 폼 처리하기 (P348)
  - HTML 표준 form은 동기 방식이기 때문에 데이터를 전송 후 페이지를 새로 그린다. 그래서 SPA에 적합하지 않다.
  - HTML 유효성 검증 : input feild에는 required, pattern, maxlength, min, max, step과 같은 표준 어트리뷰트를 사용해서 유효성을 검증할 수 있다. 예를 들어 숫자와 문자로 구성해야 할 경우
  ex) <input id="username" type="text" required pattern="[a-zA-Z0-9]">
  - 하지만 경고 메세지의 의미가 모호하며 문제를 해결할 수 있는 명확한 정보를 제공하지 못한다.
  - 입력 필드에서 다른 곳으로 포커스를 옮기면 에러 메세지도 함께 사라진다.
  - 메세지 팝업이 애플리케이션의 스타일과 어울리지 않는다.

  - Angular에서 폼을 처리하는 방식은 템플릿 기반 폼 방식과 반응형 폼 방식이 있다. 두 방식은 서로 다른 API를 사용하는데, 템플릿 기반 폼은 템플릿에서 디렉티브를 사용하고 반응형 폼은 클래스 코드에서 폼 컨트롤을 사용한다.
  - 템플릿 기반의 폼에서는 모델을 정의할 때 디렉티브만 사용할 수 있다. 이 때 사용되는 디렉티브는 FormModule에 있는 NgModel, NgModelGroup, NgForm이다.
  - 두 방식 모두 폼 데이터를 저장하는 데이터 구조(model)가 있다. 템플릿 기반 폼에서는 디렉티브를 사용해서 템플릿에 모델을 정의하며, 반응형 폼에서는 TypeScript코드로 모델을 정의하고, HTML템플릿에 각 항목을 연결한다.
  - 반응형 폼에서는 아무 객체나 모델이 될 수 있는 것은 아니다. 모델은 @angular/forms 모듈의 FormControl, FormGroup, FormArray를 사용하는 클래스 객체여야 한다.
  - 반응형 폼으로 폼을 구성하더라도, 화면을 구성하는 HTML 템플릿은 여전히 필요하다. 폼 컨트롤이 연결될 HTML엘리먼트는 템플릿에서 정의해야 한다.

   ### NgForm
   - NgForm은 폼 전체를 가리키는 디렉티브이며, 폼 모듈을 로드하면 모든 <form>엘리먼트에 이 디렉티브가 자동으로 적용된다. 따라서 폼 모듈을 로드하면 기존에 동작하던 <form>엘리먼트가 동작하지 않을 수 있으니 주의해야 한다. 그리고 NgForm 디렉티브는 자식 HTML엘리먼트를 순회하며 NgModel 디렉티브가 있는 항목을 찾고, 이 엘리먼트를 폼 모델에 추가한다. NgForm디렉티는 여러가지 방법으로 HTML엘리먼트에 적용할 수 있으며, <form>이 아닌 엘리먼트에도 이 디렉티브를 적용할 수 있다.
   ex) <div ngForm></div> //어트리뷰트로 적용
       <ngForm></ngForm> // 엘리먼트로 적용
  
   - 사용하는 CSS프레임워크에서 정해진 구조의 HTML을 요구하거나, <form>엘리먼트를 사용할 수 없는 경우, 기존 화면 구성을 건드리지 않고, NgForm을 적용해야 하는 경우에 이런 방식을 사용할 수 있다. 그리고 <form> 엘리먼트를 사용하지만 Angular로 제어하고 싶지 않다면, 이 폼에 ngNoForm어트리뷰트를 추가해서 Angular동작 범위에서 제외할 수 있다.

  ex) <div ngNoForm></div>

  - ngNoForm 어트리뷰트를 사용하면 해당 폼에 NgForm인스턴스가 생성되지 않으며, 일반 HTML폼으로 동작한다. 그리고 NgForm에는 @Directive 어노테이션 안에 exportsAs 프로퍼티가 선언되어 있는데(아래 코드에서는 #로 사용), NgForm 인스턴스에서 값을 참조할 때 지역 템플릿 변수를 지정해서 사용할 수 있다.
  ex) <form #f="ngFrom"></form>
      <pre>{{f.value | json }}</pre>

   - NgForm을 사용하면 폼에서 발생하는 submit 이벤트를 가로채서 서버로 데이터를 보내는 동작을 막는다. 따라서 submit 이벤트 대신 ngSubmit이벤트를 사용해야 한다.

   ex) <form #f="ngForm" (ngSubmit)="Onsubmit(f.value)"></form>

   ### NgModel
   - 템플릿 기반 폼에서 NgModel은 폼에 있는 필드 하나를 가리키며, 이 디렉티브를 사용하면 필드에 FormControl 인스턴스가 생성되고, 이 인스턴스에 필드의 값을 저장한다. FormControl 객체는 ngModel 어트리뷰트를 사용해서 HTML 엘리먼트에 적용할 수 있다. 양방향 데이터 바인딩을 할 때와 다르게, ngModel을 폼 API로 사용할 때는 이 어트리뷰트에 할당하는 값도 없고, 괄호를 사용하지 않는 것도 주의.

   ex) <form><input name="username" ngModel></form>

   -NgForm.value프로퍼티는 폼에 있는 모든 값을 저장하고 있는 자바스크립트 객체이며, 위 코드에서 name 어트리뷰트로 지정된 <input> 필드의 값은 자바스크립트 객체인 NgForm.value에 name프로퍼티로 저장된다.
   - NgForm과 마찬가지로 NgModel 디렉티브에도 NgModel을 가리키는 exportAs프로퍼티가 있는데, 템플릿 안에서 NgModel의 value 프로퍼티를 참조하기 위해 템플릿 변수를 지정할 수 있다.

   ex) <form><input name="username" ngModel #c="ngModel"><pre>{{ c.value }}</pre></form>

   ### NgModelGroup
   - NgModelGroup을 사용하면 폼 필드를 그룹으로 묶어 사용할 수 있다. NgForm과 비슷하게 NgModelGroup도 FormGroup 인스턴스를 내부적으로 생성한다. 기본적으로 NgModelGroup을 사용하면 NgForm.value 객체 안에 또 다른 객체를 만들고 값을 저장하는데, NgModelGroup에 속한 모든 필드는 이 객체의 프로퍼티가 된다.
   
   ex) <form #f="ngForm"><div ngModelGroup="fullName"><input name="firstName" ngModel><input name="lastName" ngModel></div></form>
   <pre>First name : {{f.value.fullName.firstName }}</pre>
   <pre>Last name : {{ f.value.fullName.lastName }}</pre>

   ### 반응형 폼
   - 반응형 폼은 먼저 TypeScript 코드 안에 폼 모델을 정의하고 이 폼 모델을 템플릿에 있는 HTML 엘리먼트와 연결한다. 폼 모델은 데이터를 저장할 때 사용하는 데이터 구조체이며, @angular/forms 모듈안에 FormControl, FormGroup, FormArray클래스로 미리 정의되어 있다.
   
   ### FormControl
   - FormControl은 폼을 구성하는 기본 단위이며, FormControl 모델은 보통 <input>엘리먼트 하나에 해당되지만, 달력이나 슬라이더 같은 복잡한 UI에도 사용할 수 있다. 이 모델을 사용하면 HTML엘리먼트에 있는 값을 저장할 수 있므며, 이 엘리먼트의 값이 변경되었는지 확인하거나 유효성 검증 상태를 확인할 때도 사용한다.
   ex) let username = new FormControl('initial value');

   ### FormGroup
   - FormGroup도 폼을 구성하는 요소이며, FormControl을 그룹으로 묶을 때 사용한다. 이 객체에는 FormControl로 지정된 엘리먼트의 값이나 상태가 저장되며, 그룹으로 묶인 FormControl 중에 유효성 검사에 실패한 항목이 있으면 전체 그룹의 유요성 검사가 실패한 것으로 처리하기 때문에, 연관된 항목을 처리할 때 편하다. 그리고 FormGroup은 폼 전체를 가리키는 용도로 사용되기도 한다.
   ex) let formModel = new FormGroup({
     form : new FormControl(),
     to : new FormControl()
   })

   ### FormArray
   - FormArray는 FormGroup과 비슷하지만 길이에 대한 정보를 제공하며, 자바스크립트의 배열과 비슷하다. 따라서 FormGroup을 폼 전체를 가리키거나 고정된 개수의 폼 필드를 표현하는 용도로 사용한다면, FormArray는 필드의 개수가 변할 때 사용하는 것이 더 적합하다. 
   eㅐ) let formModel = new FormGroup({
     emails : new FormArray([
       new FormContorl(),
       new FormControl()
     ])
   })

   ###폼 디렉티브(p359)
   - 반응형 폼에서 사용하는 디렉티브는 ReactiveFormsModule에 선언되어 있으며, 템플릿 기반의 폼에서 사용했던 디렉티브와 완전히 다르다.
   - 반응형 폼 디렉티브는 form 접두사가 붙기 때문에 템플릿에 사용된 것만 보고도 ng 접두사로 시작하는 템플릿 기반 폼 디렉티브와 구별할 수 있다. 또 반응형 디렉티브는 템플릿 기반 폼과 명확하게 구분하기 위해 템플릿 변수를 지정하는 방식으로 사용할 수 없다. 마지막으로 템플릿 기반 폼에서는 모델 클래스에 접근할 수 없었지만, 반응형 폼에서는 반대로 템플릿에서 모델에 접근할 수 없다. 반응형 폼은 TypeScript 코드에서 모델을 조작한다.
   - FormArray는 DOM프로퍼티 바인딩으로 사용할 수 없다는 것(p360)

   #### formGroup
   - formGroup은 폼을 구성하는 최상위 DOM 엘리먼트인 <form>에 FormGroup 클래스를 바인딩해서 폼 전체를 가리키는용도로 사용한다. 이 디렉티브가 지정된 DOM엘리먼트 아래에 있는 모든 디렉티브는 formGroup 스코프안에 들어가고, 폼 디렉티브에 지정한 이름을 사용해서 각 모델 인스턴스에 접근할 수 있다. 모델과 템플릿을 제대로 연결하려면 컴포넌트에 지정한 프로퍼티 이름과 폼 디렉티브에 지정한 이름이 같아야 한다.
  
    ex)
    @Component({
      template : <form [formGroup]="formModel"></form>
    })
    class FormComponent{
      formModel : FormGroup = new FormGroup({});
    }

  #### formGroupName
  - formGroupName은 폼 안에서 그룹을 묶을 때 사용한다. formGroupName 디렉티브는 FormGroup클래스를 사용하며, 그룹 안에서 또 다른 그룹을 만들 때는 FormGroup안에 또 다른 FromGroup을 선언할 수도 있다. 
  ex)
  @Component({
    template : <form [formGroup]="formModel"><div formGroupName="dataRange">...</div></form>
  })
  class FormComponent{
    formModel : FormGroup = new FormGroup({
      dataRange : new FormGroup({
        from : new FormControl(),
        to : new FormControl()
      })
    });
  }
 ** 프로퍼티 바인딩 문법을 짧게 사용하기 = > <div [formGroupName]="'dateRange'">...</div>

 #### formControlName
 - formControlName 디렉티브는 반드시 formGroup 디렉티브의 스코프 안에서 사용해야 하며, formGroup 디렉티브의 자식 FormControl 하나를 DOM엘리먼트 하나와 연결한다.
 ex)
    <form [formGroup]="formModel">
      <div formGroupName="'dataRange'">
        <input type="date" formControlName="from">
        <input type="date" formControlNmae="to">
      </div>
    </form>

 #### formControl
 - 템플릿에서 폼에 있는 필드를 가리키기 위해 formControl 디렉티브를 사용하기도 하지만, FormGroup으로 폼 모델을 정의하지 않은 상황에서 필드 하나의 유효성 검증과 같은 폼 API를 사용할 때도 FormControl 클래스를 사용할 수 있다. 또 5장에서 다뤘던 옵저버블을 폼 컨트롤에서 사용하려면 new FormControl().valueChanges 프로퍼티를 참조한다.
  ex) <input [formControl]="weatherControl">
 - 이 예제에서는 FormGroup을 만들지 않고 독립적인 FormControl을 사용하기 때문에, formControlName 디렉티브는 사용할 수 없다. 따라서 
 
## 서비스
- 특정 비지니스 로직을 다른 파일에서 관리
- 여러 서비스를 만들어 놓고 필요할 때 마다 가져다(inject) 사용
    - 생성자에 매개변수 수입 방식의 DI
- Shared 폴더
- 서비스 클래스
    - 주로 HTTP 데이터 서비스용 클래스
    - 앵귤러 모듈에 등록 필요
      - 컴포넌트와 달리 providers 섹션에 등록
- 컴포넌트 클래스
  - 서비스를 사용하는 클래스
  - 직접 데이터 서비스 코드를 구현해도 무관
- 의존성 주입 (Dependency Injection)
  - @Injectable() 데코레이터
    - Injectable  모듈 인클루드
      - import {Injectable} from '@angular/core';
    - 서비스 클래스 만들 때 사용
  - 컴포넌트 클래스의 생성자에 private로 주입
- {provide : 클래스, useClass : 클래스}
  - services.AddTransient<클래스, 클래스)(); 와 동일
  - useClass
  - useValue
  - useExsting
  - useFactory:fac()
