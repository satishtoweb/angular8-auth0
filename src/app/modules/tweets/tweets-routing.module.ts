import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TweetsComponent } from './component/tweets/tweets.component';

const routes: Routes = [
    { path: '', redirectTo: 'tweets', pathMatch: 'full' },
    { path: 'tweets', component: TweetsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TweetsRoutingModule { }