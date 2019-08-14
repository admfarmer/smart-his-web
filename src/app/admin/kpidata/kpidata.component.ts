import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';
import { ModalAddKpidataComponent } from 'src/app/shared/modal-add-kpidata/modal-add-kpidata.component';

@Component({
  selector: 'app-kpidata',
  templateUrl: './kpidata.component.html',
  styles: []
})
export class KpidataComponent implements OnInit {

  @ViewChild('mdlKpidata') private mdlKpidata: ModalAddKpidataComponent;

  items: any = [];
  info: any = {};
  searchText: string;

  years_id: any;
  kpi_id: any;
  kpi_datas: any;
  kpi_works: any;
  sdate: any;
  status: any;



  constructor(
    private alertService: AlertService,
    private kpiDatasService: KpiDatasService,

  ) { }

  ngOnInit() {
    this.getKpiInfo();
  }

  openRegister(item: any) {
    console.log(item.kpi_id);
    let info = {
      kpi_id: item.kpi_id
    }

    this.mdlKpidata.open(info);
  }

  onSave(event: any) {
    this.getKpiInfo();
    this.alertService.success();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlKpidata.open(item);
  }


  openText(item: any) {
    console.log(item);
    this.alertService.info(item);

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
