import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadingComponent } from './lazy-loading.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([
        { path: '', component: LazyLoadingComponent }
    ])],
    declarations: [LazyLoadingComponent]
})

//앱 모듈 설정에 따라 지연로딩이 되기 때문에, 루트 모듈에서는 해당 클래스를 사용할 수 없다.
//따라서 이 클래스는 외부로 공개할 때 default 키워드를 사용해야 한다.
export default class LazyLoadingModule { }
