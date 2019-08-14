import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { KpiDatasService } from 'src/app/shared/kpidatas.service';
import { ModalAddKpiyearComponent } from 'src/app/shared/modal-add-kpiyear/modal-add-kpiyear.component';

@Component({
  selector: 'app-kpiyears',
  templateUrl: './kpiyears.component.html',
  styles: []
})
export class KpiyearsComponent implements OnInit {

  @ViewChild('mdlKpiyear') private mdlKpiyear: ModalAddKpiyearComponent;

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
    this.getKpiYears();
  }

  onSave(event: any) {
    this.getKpiYears();
    this.alertService.success();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlKpiyear.open(item);
  }

  openRegister() {
    console.log('ADD');
    this.mdlKpiyear.open();
  }

  remove(item: any) {
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
}
