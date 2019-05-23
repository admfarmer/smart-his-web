import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { ClipboardModule } from 'ngx-clipboard';
import { LayoutComponent } from './layout/layout.component';

import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './settings/user/user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    LayoutComponent

  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    CountdownModule,
    AdminRoutingModule,
    SharedModule,

  ]
})
export class AdminModule { }
