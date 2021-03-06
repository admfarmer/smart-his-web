import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { ClipboardModule } from 'ngx-clipboard';
import { LayoutComponent } from './layout/layout.component';
import { DataTableModule } from "angular-6-datatable";
import { GrdFilterPipe } from '../shared/grd-filter.pipe';
import { ExportAsModule } from 'ngx-export-as';

import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './settings/user/user.component';
import { OvsitdxComponent } from './ovsitdx/ovsitdx.component';
import { KpidataComponent } from './kpidata/kpidata.component';
import { KpiComponent } from './settings/kpi/kpi.component';
import { KpiyearsComponent } from './settings/kpiyears/kpiyears.component';
import { HisincothComponent } from './hisincoth/hisincoth.component';
import { HisrcptComponent } from './hisrcpt/hisrcpt.component';
import { VisitComponent } from './visit/visit.component';
import { IptuploadComponent } from './iptupload/iptupload.component';
import { HisancComponent } from './hisanc/hisanc.component';
import { IptreportComponent } from './iptreport/iptreport.component';
import { KpistgComponent } from './settings/kpistg/kpistg.component';
import { DebtorComponent } from './debtor/debtor.component';
import { SsoVisitComponent } from './sso-visit/sso-visit.component';

@NgModule({
  declarations: [
    UserComponent,
    LayoutComponent,
    OvsitdxComponent,
    KpidataComponent,
    GrdFilterPipe,
    KpiComponent,
    KpiyearsComponent,
    HisincothComponent,
    HisrcptComponent,
    VisitComponent,
    IptuploadComponent,
    HisancComponent,
    IptreportComponent,
    KpistgComponent,
    DebtorComponent,
    SsoVisitComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    CountdownModule,
    AdminRoutingModule,
    SharedModule,
    DataTableModule,
    ExportAsModule
  ]
})
export class AdminModule { }
