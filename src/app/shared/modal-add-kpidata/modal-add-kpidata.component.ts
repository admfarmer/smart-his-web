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

  modalReference: NgbModalRef;
  items: any = [];
  itemsKpi: any = [];
  itemsKpiYears: any = [];
  info: any = {};

  years_id: any;
  kpi_id: any;
  kpi_datas: any;
  kpi_works: any;
  sdate: any;
  status: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiDatasService: KpiDatasService
  ) { }

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
    console.log(info);

    if (info.id) {
      this.years_id = info.years_id;
      this.kpi_id = info.kpi_id;
      this.kpi_datas = info.kpi_datas;
      this.kpi_works = info.kpi_works;
      this.sdate = moment(info.sdate).format('YYYY-MM-DD') || moment(Date()).format('YYYY-MM-DD');
      this.status = info.status || 'N';
    } else if (info.kpi_id) {
      this.kpi_id = info.kpi_id;
      this.sdate = moment(info.sdate).format('YYYY-MM-DD') || moment(Date()).format('YYYY-MM-DD');
      this.status = info.status || 'Y';
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

  async save() {

    let _info = {
      years_id: this.years_id,
      kpi_id: this.kpi_id,
      kpi_datas: this.kpi_datas,
      kpi_works: this.kpi_works,
      sdate: moment(this.sdate).format('YYYY-MM-DD'),
      status: this.status || 'Y'
    }

    console.log(_info);

    if (this.years_id && this.kpi_datas && this.kpi_works) {
      try {
        let rs: any = await this.kpiDatasService.save(_info);
        console.log(rs.info.length);

        if (rs.info.length) {
          this.modalReference.close();
          this.onSave.emit();
        } else {
          this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
        }

      } catch (error) {
        console.log(error);
        this.alertService.error('เกิดข้อผิดพลาด');
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
      this.alertService.error();
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
      this.alertService.error();
    }
  }


}
