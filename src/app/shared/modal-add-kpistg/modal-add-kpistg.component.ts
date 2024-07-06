import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { KpiService } from '../kpi.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-kpistg',
  templateUrl: './modal-add-kpistg.component.html',
  styleUrls: []
})
export class ModalAddKpistgComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  itemsStg: any = [];
  info: any = {};

  stg_id: any;
  stg_id_old: any;
  stg_name: any;
  stg_detail: any;
  stg_own: any;
  stg_status: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiService: KpiService
  ) { }

  ngOnInit() {
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
    if (info.stg_id) {
      this.stg_id = info.stg_id;
      this.stg_id_old = info.stg_id;
      this.stg_name = info.stg_name;
      this.stg_detail = info.stg_detail;
      this.stg_own = info.stg_own;
      this.stg_status = info.stg_status || '1';
    } else {
      this.stg_id = null;
      this.stg_id_old = null;
      this.stg_name = null;
      this.stg_detail = null;
      this.stg_own = null;
      this.stg_status = null;
    }
    this.modalReference.result.then((result) => { });
  }

  dismiss() {
    this.modalReference.close();
    this.stg_id = null;
    this.stg_id_old = null;
    this.stg_name = null;
    this.stg_detail = null;
    this.stg_own = null;
    this.stg_status = null;
  }

  async save() {

    let _info = {
      stg_id: this.stg_id,
      stg_name: this.stg_name,
      stg_detail: this.stg_detail,
      stg_own: this.stg_own,
      stg_status: this.stg_status || '1'
    }
    // console.log(_info);
    if (this.stg_own && this.stg_name && this.stg_detail) {
      try {
        if (this.stg_id_old) {
          let _stg_id = this.stg_id_old;
          // console.log("edit data");
          let rs: any = await this.kpiService.updateStg(_info, _stg_id);
          // console.log(rs.info);
          if (rs.info) {
            this.modalReference.close();
            this.onSave.emit();
            this.stg_id = null;
            this.stg_id_old = null;
            this.stg_name = null;
            this.stg_detail = null;
            this.stg_own = null;
            this.stg_status = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }
        } else {
          // console.log("add data");
          let rs: any = await this.kpiService.saveStg(_info);
          // console.log(rs.info.length);
          if (rs.info.length) {
            this.modalReference.close();
            this.onSave.emit();
            this.stg_id = null;
            this.stg_id_old = null;
            this.stg_name = null;
            this.stg_detail = null;
            this.stg_own = null;
            this.stg_status = null;
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
