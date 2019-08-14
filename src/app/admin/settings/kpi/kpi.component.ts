import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiService } from 'src/app/shared/kpi.service';
import { ModalAddKpiComponent } from 'src/app/shared/modal-add-kpi/modal-add-kpi.component';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styles: []
})
export class KpiComponent implements OnInit {
  @ViewChild('mdlKpi') private mdlKpi: ModalAddKpiComponent;

  isCollapsed = true;
  fullname: string;
  userType: string;
  hcode: any;

  items: any = [];
  info: any = {};
  searchText: string;

  constructor(
    private alertService: AlertService,
    private kpiService: KpiService,

  ) {
    this.fullname = sessionStorage.getItem('fullname');
    this.userType = sessionStorage.getItem('userType');
    this.hcode = sessionStorage.getItem('hcode');

  }

  ngOnInit() {
    this.getKpiInfo();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlKpi.open(item);
  }

  openRegister() {
    console.log('ADD');
    this.mdlKpi.open();
  }
  onSave(event: any) {
    this.getKpiInfo();
    this.alertService.success();
  }

  remove(item: any) {
    console.log(item);
  }

  async getKpiInfo() {
    try {
      const rs: any = await this.kpiService.getKpiInfo();
      if (rs.info) {
        this.items = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
}
