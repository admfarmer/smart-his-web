import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';

@Component({
  selector: 'app-kpidata',
  templateUrl: './kpidata.component.html',
  styleUrls: ['./kpidata.component.css']
})
export class KpidataComponent implements OnInit {
  items: any = [];
  info: any = {};
  searchText: string;

  constructor(
    private alertService: AlertService,
    private kpiDatasService: KpiDatasService,

  ) { }

  ngOnInit() {
    this.getKpiInfo();
  }

  openEdit(item: any) {
    console.log(item);
  }

  openText(item: any) {
    console.log(item);
  }

  async getKpiYears() {
    try {
      const rs: any = await this.kpiDatasService.getKpiYears();
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


  async getKpiDatasInfo() {
    try {
      const rs: any = await this.kpiDatasService.getKpiDatasInfo();
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
