import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './settings/user/user.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { OvsitdxComponent } from './ovsitdx/ovsitdx.component'
const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      { path: 'ovstdx', component: OvsitdxComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
