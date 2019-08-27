import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { LoginService } from './login.service';
import { ShortTimePipe } from './short-time.pipe';
import { ThaiDatePipe } from './thai-date.pipe';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OvsitdxService } from 'src/app/shared/ovsitdx.service';
import { ModalAddKpidataComponent } from './modal-add-kpidata/modal-add-kpidata.component';
import { ModalAddKpiyearComponent } from './modal-add-kpiyear/modal-add-kpiyear.component';
import { ModalAddKpiComponent } from './modal-add-kpi/modal-add-kpi.component';
import { ModalDetailKpiComponent } from './modal-detail-kpi/modal-detail-kpi.component';

import { KpiService } from 'src/app/shared/kpi.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';
import { KpiYearsService } from 'src/app/shared/kpiyears.service';
import { HisIncothService } from 'src/app/shared/his-incoth.service';
import { HisRcptService } from 'src/app/shared/his-rcpt.service';
import { ModalAddIncothComponent } from './modal-add-incoth/modal-add-incoth.component';
import { ModalAddRcptComponent } from './modal-add-rcpt/modal-add-rcpt.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule

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
    ModalAddRcptComponent
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
    ModalAddRcptComponent
  ],
  providers: [
    AuthGuardService,
    LoginService,
    OvsitdxService,
    KpiService,
    KpiDatasService,
    KpiYearsService,
    HisIncothService,
    HisRcptService
  ]
})
export class SharedModule { }
