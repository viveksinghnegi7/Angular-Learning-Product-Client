import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from "./helpers/auth.gaurd";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const routes: Routes = [
    {
    path: '', component: FullComponent,
      children: [
        {
          path: '',
          redirectTo: '/users',
          pathMatch: 'full'
        }//,
        //{
        //  path: '',
        //  loadChildren:
        //    () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
        //}
        ,
        {
          path: 'users',
          loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
        }
    ],
     canActivate: [AuthGuard]
  },
    { path: 'account', loadChildren: accountModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
