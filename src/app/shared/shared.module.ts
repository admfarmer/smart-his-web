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
    ModalAddKpiyearComponent
  ],
  exports: [
    ShortTimePipe,
    ThaiDatePipe,
    ToggleFullscreenDirective,
    ModalAddUserComponent,
    ModalAddKpidataComponent,
    ModalAddKpiyearComponent
  ],
  providers: [
    AuthGuardService,
    LoginService,
    OvsitdxService
  ]
})
export class SharedModule { }
