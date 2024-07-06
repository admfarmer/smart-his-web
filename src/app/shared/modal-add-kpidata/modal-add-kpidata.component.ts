import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { KpiDatasService } from '../kpidatas.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-kpidata',
  templateUrl: './modal-add-kpidata.component.html',
  styles: []
})
export class ModalAddKpidataComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;
  fullname: string;

  modalReference: NgbModalRef;
  items: any = [];
  itemsKpi: any = [];
  itemsKpiYears: any = [];
  info: any = {};

  id: any;
  years_id: any;
  kpi_id: any;
  kpi_datas: any;
  kpi_works: any;
  sdate: any;
  status: any;
  user_works: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiDatasService: KpiDatasService
  ) {
    this.fullname = sessionStorage.getItem('fullname');
  }

  ngOnInit(): void {
    this.getKpiInfo();
    this.getKpiYears();
  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      centered: false
    });
    // console.log(info);
    if (info.id) {
      this.years_id = info.years_id;
      this.kpi_id = info.kpi_id;
      this.kpi_datas = info.kpi_datas;
      this.kpi_works = info.kpi_works;
      this.sdate = moment(info.sdate).format('YYYY-MM-DD') || moment(Date()).format('YYYY-MM-DD');
      this.status = info.status || 'Y';
      this.user_works = this.fullname
    } else if (info.kpi_id) {
      this.kpi_id = info.kpi_id;
      this.sdate = moment(info.sdate).format('YYYY-MM-DD') || moment(Date()).format('YYYY-MM-DD');
      this.status = info.status || 'Y';
      this.user_works = this.fullname
    }
    else {
      this.years_id = null;
      this.kpi_id = null;
      this.kpi_datas = null;
      this.kpi_works = null;
      this.sdate = null;
      this.status = null;
    }
    this.modalReference.result.then((result) => { });
  }

  async getYearsItem(years_id: any) {
    // console.log(years_id);

    let _info = {
      years_id: years_id,
      kpi_id: this.kpi_id
    }
    try {
      // console.log(_info);
      const rs: any = await this.kpiDatasService.getKpiYearitem(_info);
      if (rs.info) {
        // this.itemsKpiYears = rs.info;
        let _info = rs.info[0];
        // console.log(_info);
        this.id = _info.id;
        this.years_id = _info.years_id;
        this.kpi_id = _info.kpi_id;
        this.kpi_datas = _info.kpi_datas;
        this.kpi_works = _info.kpi_works;
        this.sdate = moment(_info.sdate).format('YYYY-MM-DD');
        this.status = _info.status;
      } else {
        this.id = null;
        this.kpi_datas = null;
        this.kpi_works = null;
        this.sdate = moment(Date()).format('YYYY-MM-DD');
        this.status = 'Y';
        // this.alertService.error('เกิดข้อผิดพลาด');
      }

    } catch (error) {
      // console.log(error);
      this.id = null;
      this.kpi_datas = null;
      this.kpi_works = null;
      this.sdate = moment(Date()).format('YYYY-MM-DD');
      this.status = 'Y';
      // this.alertService.error('เกิดข้อผิดพลาด');
    }

  }
  async save() {
    let _info = {
      years_id: this.years_id,
      kpi_id: this.kpi_id,
      kpi_datas: this.kpi_datas,
      kpi_works: this.kpi_works,
      sdate: moment(this.sdate).format('YYYY-MM-DD'),
      status: this.status || 'Y',
      user_works: this.fullname
    }
    // console.log(_info);
    if (this.years_id && this.kpi_datas && this.kpi_works) {
      try {
        if (this.id) {
          let _id = this.id;
          // console.log("edit data");
          let rs: any = await this.kpiDatasService.update(_info, _id);
          // console.log(rs.info);
          if (rs.info) {
            this.modalReference.close();
            this.onSave.emit();
            this.id = null;
            this.years_id = null;
            this.kpi_id = null;
            this.kpi_datas = null;
            this.kpi_works = null;
            this.sdate = null;
            this.status = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }
        } else {
          // console.log("add data");
          let rs: any = await this.kpiDatasService.save(_info);
          // console.log(rs.info.length);
          if (rs.info.length) {
            this.modalReference.close();
            this.onSave.emit();
            this.id = null;
            this.years_id = null;
            this.kpi_id = null;
            this.kpi_datas = null;
            this.kpi_works = null;
            this.sdate = null;
            this.status = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }
        }
      } catch (error) {
        console.log(error);
        // this.alertService.error('เกิดข้อผิดพลาด');
      }
    }

  }

  dismiss() {
    this.modalReference.close();
    this.years_id = null;
    this.kpi_id = null;
    this.kpi_datas = null;
    this.kpi_works = null;
    this.sdate = null;
    this.status = null;
  }

  async getKpiYears() {
    try {
      const rs: any = await this.kpiDatasService.getKpiYears();
      if (rs.info) {
        this.itemsKpiYears = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      // this.alertService.error();
    }
  }

  async getKpiInfo() {
    try {
      const rs: any = await this.kpiDatasService.getKpiInfo();
      if (rs.info) {
        this.itemsKpi = rs.info;
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
