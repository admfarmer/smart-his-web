import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { LoginService } from './login.service';
import { ShortTimePipe } from './short-time.pipe';
import { ThaiDatePipe } from './thai-date.pipe';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';

import { HisVisitService } from 'src/app/shared/his-visit.service';
import { KpiService } from 'src/app/shared/kpi.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';
import { KpiYearsService } from 'src/app/shared/kpiyears.service';
import { HisIncothService } from 'src/app/shared/his-incoth.service';
import { HisRcptService } from 'src/app/shared/his-rcpt.service';
import { HisIptService } from 'src/app/shared/his-ipt.service';
import { FileuploadService } from 'src/app/shared/fileupload.service';
import { OvsitdxService } from 'src/app/shared/ovsitdx.service';
import { HisAncService } from 'src/app/shared/his-anc.service';

import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ModalAddKpidataComponent } from './modal-add-kpidata/modal-add-kpidata.component';
import { ModalAddKpiyearComponent } from './modal-add-kpiyear/modal-add-kpiyear.component';
import { ModalAddKpiComponent } from './modal-add-kpi/modal-add-kpi.component';
import { ModalDetailKpiComponent } from './modal-detail-kpi/modal-detail-kpi.component';
import { ModalAddIncothComponent } from './modal-add-incoth/modal-add-incoth.component';
import { ModalAddRcptComponent } from './modal-add-rcpt/modal-add-rcpt.component';
import { ModalDetailVisitComponent } from './modal-detail-visit/modal-detail-visit.component';
import { ModalAddKpistgComponent } from './modal-add-kpistg/modal-add-kpistg.component';
import { ModalDetailAncComponent } from './modal-detail-anc/modal-detail-anc.component';
import { ModalEditDebtorComponent } from './modal-edit-debtor/modal-edit-debtor.component';
import { ModalSsoVisitComponent } from './modal-sso-visit/modal-sso-visit.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ExportAsModule

  ],
  declarations: [
    ShortTimePipe,
    ThaiDatePipe,
    ToggleFullscreenDirective,
    ModalAddUserComponent,
    ModalAddKpidataComponent,
    ModalAddKpiyearComponent,
    ModalAddKpiComponent,
    ModalDetailKpiComponent,
    ModalAddIncothComponent,
    ModalAddRcptComponent,
    ModalDetailVisitComponent,
    ModalAddKpistgComponent,
    ModalDetailAncComponent,
    ModalEditDebtorComponent,
    ModalSsoVisitComponent
  ],
  exports: [
    ShortTimePipe,
    ThaiDatePipe,
    ToggleFullscreenDirective,
    ModalAddUserComponent,
    ModalAddKpidataComponent,
    ModalAddKpiyearComponent,
    ModalAddKpiComponent,
    ModalDetailKpiComponent,
    ModalAddIncothComponent,
    ModalAddRcptComponent,
    ModalDetailVisitComponent,
    ModalAddKpistgComponent,
    ModalDetailAncComponent,
    ModalEditDebtorComponent,
    ModalSsoVisitComponent
  ],
  providers: [
    AuthGuardService,
    LoginService,
    OvsitdxService,
    KpiService,
    KpiDatasService,
    KpiYearsService,
    HisIncothService,
    HisRcptService,
    HisVisitService,
    FileuploadService,
    HisIptService,
    HisAncService
  ]
})
export class SharedModule { }
