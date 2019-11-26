import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiService } from 'src/app/shared/kpi.service';
import { ModalAddKpistgComponent } from 'src/app/shared/modal-add-kpistg/modal-add-kpistg.component';

@Component({
  selector: 'app-kpistg',
  templateUrl: './kpistg.component.html',
  styleUrls: []
})
export class KpistgComponent implements OnInit {
  @ViewChild('mdlKpiStg') private mdlKpiStg: ModalAddKpistgComponent;

  isCollapsed = true;
  fullname: string;
  userType: string;
  hcode: any;

  items: any = [];
  info: any = {};
  searchText: string;

  constructor(
    private alertService: AlertService,
    private kpiService: KpiService

  ) {
    this.fullname = sessionStorage.getItem('fullname');
    this.userType = sessionStorage.getItem('userType');
    this.hcode = sessionStorage.getItem('hcode');

  }

  ngOnInit() {
    this.getStgInfo();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlKpiStg.open(item);
  }

  openRegister() {
    console.log('ADD');
    this.mdlKpiStg.open();
  }

  onSave(event: any) {
    this.getStgInfo();
    this.alertService.success();
  }

  remove(item: any) {
    console.log(item);
  }

  async getStgInfo() {
    try {
      const rs: any = await this.kpiService.getStgSelect();
      if (rs.info) {
        this.items = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      // this.alertService.error();
    }
  }

}
