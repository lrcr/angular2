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
- AppModule의 @NGModule - declaration 에 선언되면 어플리케이션 전역에서 사용가능
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
- Angular 애플리케이션에는 전체 모듈에서 사용하는 루티 인젝터(root Injector)가 있으며, 컴포넌트에서 객체나 기본형 변수, 컴포넌트, 서비스를 주입받으면 컴포넌트 안에도 인젝터를 따로 만든다. 프로바이더는 인젝터가 무엇을 주입해야 할지 알려주기 위해 사용하며, 프로바이더로 지정된 객체나 값을 인젝터가 생성해서 원하는 컴포넌트에 주입한다.(P182)
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
    - #txtName, #tx tEmail

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
