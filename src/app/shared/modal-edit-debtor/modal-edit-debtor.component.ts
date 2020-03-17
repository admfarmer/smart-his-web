import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { HisIncothService } from '../his-incoth.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-edit-debtor',
  templateUrl: './modal-edit-debtor.component.html',
  styles: []
})
export class ModalEditDebtorComponent implements OnInit {
  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};

  vn: any;
  fullname: any;
  date_serv: any;
  total: any;
  accept: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private hisIncothService: HisIncothService
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
    console.log(info);
    if (info.vn) {
      this.vn = info.vn;
      this.fullname = info.fullname;
      this.date_serv = info.date_serv;
      this.total = info.total;
      this.accept = info.accept;
    } else {
      this.vn = null;
      this.fullname = null;
      this.date_serv = null;
      this.total = null;
      this.accept = null;
    }
    this.modalReference.result.then((result) => { });
  }

  dismiss() {
    this.modalReference.close();
    this.vn = null;
    this.fullname = null;
    this.date_serv = null;
    this.total = null;
    this.accept = null;
  }

  async save() {

    let _info = {
      total: this.total,
      accept: this.accept,
      status: 'ACQUIT'
    }
    console.log(_info);
    if (this.vn && this.accept) {
      try {
        let _vn = this.vn;
        console.log("edit data");
        let rs: any = await this.hisIncothService.updateDebtor(_info, _vn);
        // console.log(rs.info);
        if (rs.info) {
          this.modalReference.close();
          this.onSave.emit();
          this.vn = null;
          this.fullname = null;
          this.date_serv = null;
          this.total = null;
          this.accept = null;
        } else {
          this.alertService.error('ไม่สามารถบันทึกข้อมูลได้');
        }
      } catch (error) {
        console.log(error);
        // this.alertService.error('เกิดข้อผิดพลาด');
      }
    }

  }
}
