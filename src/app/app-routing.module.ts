import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import {
  HomeComponent,
  MovieComponent,
  ProfileComponent,
  SignupComponent,
  LoginComponent,
  WatchComponent,
  IndexComponent,
  MyListComponent,
  ProfileManageComponent,
  SignupStep1Component,
  SignupStep2Component,
  SignupStep3Component,
  SignupStep4Component,
  SearchComponent,
} from './components';

/* Guard */
import { AuthGuard } from './services/auth.guard';
import { SecondGuard } from './services/second.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'welcome', component: IndexComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      /* SignupComponentd의 <router-outlet>에 표시 */
      {
        path: 'step1',
        component: SignupStep1Component,
        data: { animation: 'step1' },
      },
      {
        path: 'step2',
        component: SignupStep2Component,
        data: { animation: 'step2' },
      },
      {
        path: 'step3',
        component: SignupStep3Component,
        data: { animation: 'step3' },
      },
      {
        path: 'step4',
        component: SignupStep4Component,
        data: { animation: 'step4' },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [SecondGuard] },
  {
    path: 'profile/manage',
    component: ProfileManageComponent,
    canActivate: [SecondGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'movie', component: MovieComponent, canActivate: [AuthGuard] },

  { path: 'watch/:id', component: WatchComponent, canActivate: [AuthGuard] },
  { path: 'mylist', component: MyListComponent, canActivate: [AuthGuard] },
  {
    path: 'search/:query',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
