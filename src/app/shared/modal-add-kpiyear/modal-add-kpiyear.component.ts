import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { KpiYearsService } from '../kpiyears.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-kpiyear',
  templateUrl: './modal-add-kpiyear.component.html',
  styles: []
})
export class ModalAddKpiyearComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};

  id: any;
  quarter: any;
  year: any;
  status: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private kpiYearsService: KpiYearsService
  ) { }

  ngOnInit() {
  }

  open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'sm',
      centered: false
    });
    // console.log(info);
    if (info.id) {
      this.id = info.id;
      this.quarter = info.quarter;
      this.year = info.year;
      this.status = info.status || 'Y';
    }
    else {
      this.id = null;
      this.quarter = null;
      this.year = null;
      this.status = null;
    }
    this.modalReference.result.then((result) => { });
  }

  async save() {
    console.log("save");

    let _info = {
      quarter: this.quarter,
      year: this.year,
      status: this.status || 'Y'
    }
    if (this.quarter && this.year) {
      try {
        if (this.id) {
          let _id = this.id;
          console.log("edit data");
          let rs: any = await this.kpiYearsService.update(_info, _id);
          // console.log(rs.info);
          if (rs.info) {
            this.modalReference.close();
            this.onSave.emit();
            this.id = null;
            this.quarter = null;
            this.year = null;
            this.status = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }
        } else {
          console.log("add data");
          let rs: any = await this.kpiYearsService.save(_info);
          // console.log(rs.info.length);
          if (rs.info.length) {
            this.modalReference.close();
            this.onSave.emit();
            this.id = null;
            this.quarter = null;
            this.year = null;
            this.status = null;
          } else {
            this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
          }

        }
      } catch (error) {
        console.log(error);
        // this.alertService.error();
      }
    }

  }
  dismiss() {
    this.modalReference.close();
    this.id = null;
    this.quarter = null;
    this.year = null;
    this.status = null;
  }


}
