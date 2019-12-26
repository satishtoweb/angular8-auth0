import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TweetsComponent } from './component/tweets/tweets.component';
import { TweetsRoutingModule } from './tweets-routing.module';

@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    RouterModule,
    TweetsRoutingModule
  ]
})
export class TweetsModule { }
