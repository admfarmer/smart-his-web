import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { HisIncothService } from 'src/app/shared/his-incoth.service';
import { ModalEditDebtorComponent } from 'src/app/shared/modal-edit-debtor/modal-edit-debtor.component'
import * as moment from 'moment';

@Component({
  selector: 'app-debtor',
  templateUrl: './debtor.component.html',
  styles: []
})
export class DebtorComponent implements OnInit {
  @ViewChild('mdlDebtorIncoth') private mdlDebtorIncoth: ModalEditDebtorComponent;

  constructor(
    private alertService: AlertService,
    private hisIncothService: HisIncothService
  ) { }

  items: any = [];
  info: any = {};
  searchText: string;
  hnText: string;
  vstdttmText: string;

  ngOnInit() {
    this.getDebtorInfo();
  }

  onSave(event: any) {
    this.alertService.success();
    this.getDebtorInfo();
  }

  openEdit(item: any) {
    this.mdlDebtorIncoth.open(item);

  }

  async getDebtorInfo() {
    try {
      const rs: any = await this.hisIncothService.getDebtorInfo();
      if (rs.info) {
        this.items = rs.info;
        console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
}
