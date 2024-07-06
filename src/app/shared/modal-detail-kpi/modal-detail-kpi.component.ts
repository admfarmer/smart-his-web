import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { KpiService } from '../kpi.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-detail-kpi',
  templateUrl: './modal-detail-kpi.component.html',
  styles: []
})
export class ModalDetailKpiComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};

  id: any;
  years_id: any;
  kpi_id: any;
  kpi_datas: any;
  kpi_works: any;
  sdate: any;
  quarter: any;
  year: any;
  kpi_name: any;
  kpi_scale: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiService: KpiService

  ) { }

  ngOnInit() {

  }

  async open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      centered: false
    });
    // console.log(info);
    try {
      let rs: any = await this.kpiService.getKpiDetail(info.kpi_id);
      if (rs.info) {
        this.items = rs.info;
        // console.log(this.items);
        this.kpi_name = this.items[0].kpi_name
        this.kpi_scale = this.items[0].kpi_scale
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }

    } catch (error) {
      console.log(error);
      // this.alertService.error('เกิดข้อผิดพลาด');
    }
    this.modalReference.result.then((result) => { });
  }
  dismiss() {
    this.modalReference.close();
  }

}
