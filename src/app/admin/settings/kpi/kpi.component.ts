import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {
  isCollapsed = true;
  fullname: string;
  userType: string;
  hcode: any;

  items: any = [];
  info: any = {};
  searchText: string;

  constructor(
    private alertService: AlertService,
    private kpiDatasService: KpiDatasService,

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
  }

  openRegister() {
    console.log('ADD');
  }

  remove(item: any) {
    console.log(item);
  }

  async getKpiInfo() {
    try {
      const rs: any = await this.kpiDatasService.getKpiInfo();
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
