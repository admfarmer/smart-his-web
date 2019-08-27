import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { HisIncothService } from '../his-incoth.service';
import { HisRcptService } from '../his-rcpt.service';

import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-rcpt',
  templateUrl: './modal-add-rcpt.component.html',
  styles: []
})
export class ModalAddRcptComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};
  item_amnt: any

  id: any;
  namecost: any;
  rcptamt: any;

  vn: any;
  rcptno: any;
  an: any;
  vstdate: any;
  vsttime: any;
  pttype: any;
  rcptdate: any;
  rcpttime: any;
  bookno: any;
  pageno: any;
  gbookno: any;
  gpageno: any;
  amnt: any;
  credit: any;
  modulate: any;
  staff: any;
  lmdfdate: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private hisIncothService: HisIncothService,
    private hisRcptService: HisRcptService
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

    if (info.vn) {
      this.getIncoth(info.vn);
      // console.log(this.items);

      this.vn = info.vn;
      this.an = info.an || '0';
      this.vstdate = moment(info.vstdttm).format("YYYY-MM-DD");
      // this.vsttime = moment(info.vstdttm + info.vstdttm).format("YYYY-MM-DD");
      this.pttype = info.pttype;

    } else {
      this.rcptamt = null;
      this.credit = null;
      this.gpageno = null;
    }
    this.modalReference.result.then((result) => { });
  }

  creditInput(rcptamt) {
    this.credit = this.item_amnt - rcptamt;
  }
  dismiss() {
    this.modalReference.close();
    this.rcptamt = null;
    this.credit = null;
    this.gpageno = null;
  }

  async getIncoth(vn) {
    try {
      let rs: any = await this.hisIncothService.getIncothVn(vn);
      // console.log(rs.info);
      if (rs.info) {
        this.items = rs.info
        this.vsttime = this.items[0].time;

        let _item_amnt: any = 0;
        this.items.forEach(v => {
          _item_amnt += +v.rcptamt;
        });
        this.item_amnt = _item_amnt;

      } else {
        this.alertService.error('ไม่พบข้อมูล');
      }
    } catch (error) {
      console.log(error);
      // this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  async save() {

    let _info = {
      // rcptamt: this.rcptamt,
      vn: this.vn,
      an: this.an,
      vstdate: this.vstdate,
      vsttime: this.vsttime,
      pttype: this.pttype,
      rcptdate: moment(Date()).format("YYYY-MM-DD"),
      rcpttime: moment(Date()).format("HMM"),
      bookno: this.bookno || '0',
      pageno: this.pageno || '0',
      gbookno: this.gbookno || '0',
      gpageno: this.gpageno || '0',
      amnt: this.rcptamt,
      credit: this.credit,
      modulate: this.modulate || '0',
      staff: '99',
      lmdfdate: moment(Date()).format("YYYY-MM-DD")
    }
    // console.log(_info);

    if (this.vn && this.rcptamt) {
      try {
        console.log("save data");
        let rs: any = await this.hisRcptService.save(_info);
        // console.log(rs.info);
        let x = rs.info;

        if (this.vn && rs.info) {
          let _rcptno = {
            rcptno: x
          }
          let rcpt: any = await this.hisIncothService.updateRcpt(_rcptno, this.vn);
          // console.log(rcpt);

          let ovst: any = await this.hisIncothService.updateOvst(_rcptno, this.vn);
          // console.log(ovst);
          this.modalReference.close();
          this.onSave.emit();
          this.rcptamt = null;
          this.credit = null;
          this.gpageno = null;
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
