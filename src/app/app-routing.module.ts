import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth/auth.gaurd';


const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch:'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: '', redirectTo: 'tweets', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule', 
    canActivate: [AuthGuard]
  },
  { path: 'tweets', loadChildren: './modules/tweets/tweets.module#TweetsModule',
    canActivate: [AuthGuard]  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

