import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { KpiService } from '../kpi.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-kpi',
  templateUrl: './modal-add-kpi.component.html',
  styles: []
})
export class ModalAddKpiComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  itemsStg: any = [];
  info: any = {};

  kpi_id: any;
  kpi_stg_id: any;
  kpi_name: any;
  kpi_detail: any;
  kpi_type: any;
  kpi_scale: any;
  owner: any;
  kpi_status: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiService: KpiService
  ) { }

  ngOnInit() {
    this.getStgInfo();
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
    if (info.kpi_id) {
      this.kpi_id = info.kpi_id;
      this.kpi_stg_id = info.kpi_stg_id;
      this.kpi_name = info.kpi_name;
      this.kpi_detail = info.kpi_detail;
      this.kpi_type = info.kpi_type;
      this.kpi_scale = info.kpi_scale;
      this.owner = info.owner;
      this.kpi_status = info.kpi_status || '1';
    } else {
      this.kpi_id = null;
      this.kpi_stg_id = null;
      this.kpi_name = null;
      this.kpi_detail = null;
      this.kpi_type = null;
      this.kpi_scale = null;
      this.owner = null;
      this.kpi_status = null;
    }
    this.modalReference.result.then((result) => { });
  }

  dismiss() {
    this.modalReference.close();
    this.kpi_id = null;
    this.kpi_stg_id = null;
    this.kpi_name = null;
    this.kpi_detail = null;
    this.kpi_type = null;
    this.kpi_scale = null;
    this.owner = null;
    this.kpi_status = null;
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
      // this.alertService.error();
    }
  }

  async getStgInfo() {
    try {
      const rs: any = await this.kpiService.getStgInfo();
      if (rs.info) {
        this.itemsStg = rs.info;
        // console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      // this.alertService.error();
    }
  }

  async save() {

    let _info = {
      kpi_stg_id: this.kpi_stg_id,
      kpi_name: this.kpi_name,
      kpi_detail: this.kpi_detail,
      kpi_type: this.kpi_type,
      kpi_scale: this.kpi_scale,
      owner: this.owner,
      kpi_status: this.kpi_status || '1'
    }
    // console.log(_info);
    if (this.kpi_stg_id && this.kpi_name && this.kpi_scale) {
      try {
        if (this.kpi_id) {
          let _kpi_id = this.kpi_id;
          // console.log("edit data");
          let rs: any = await this.kpiService.update(_info, _kpi_id);
          // console.log(rs.info);
          if (rs.info) {
            this.modalReference.close();
            this.onSave.emit();
            this.kpi_id = null;
            this.kpi_stg_id = null;
            this.kpi_name = null;
            this.kpi_detail = null;
            this.kpi_type = null;
            this.kpi_scale = null;
            this.owner = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }
        } else {
          // console.log("add data");
          let rs: any = await this.kpiService.save(_info);
          // console.log(rs.info.length);
          if (rs.info.length) {
            this.modalReference.close();
            this.onSave.emit();
            this.kpi_id = null;
            this.kpi_stg_id = null;
            this.kpi_name = null;
            this.kpi_detail = null;
            this.kpi_type = null;
            this.kpi_scale = null;
            this.owner = null;
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
}
