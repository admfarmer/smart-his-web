import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './settings/user/user.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { OvsitdxComponent } from './ovsitdx/ovsitdx.component';
import { KpidataComponent } from './kpidata/kpidata.component';
import { KpiComponent } from './settings/kpi/kpi.component';
import { KpiyearsComponent } from './settings/kpiyears/kpiyears.component';
import { HisincothComponent } from './hisincoth/hisincoth.component';

const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'kpidatas', pathMatch: 'full' },
      { path: 'incoth', component: HisincothComponent },
      { path: 'kpis', component: KpiComponent },
      { path: 'kpiyears', component: KpiyearsComponent },
      { path: 'kpidatas', component: KpidataComponent },
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
