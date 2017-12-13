import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddedModuleComponent } from './add-module.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild([
        { path: 'added-module-compo', component: AddedModuleComponent }
    ])],
    declarations: [AddedModuleComponent]
})

export class AddedModule { }
