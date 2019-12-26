import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './component/login/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }
