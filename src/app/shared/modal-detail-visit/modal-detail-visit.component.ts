import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { HisVisitService } from '../his-visit.service';
import * as moment from 'moment'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-modal-detail-visit',
  templateUrl: './modal-detail-visit.component.html',
  styles: []
})
export class ModalDetailVisitComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};
  profile: any = [];
  hn: any;
  dateServ: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private hisVisitService: HisVisitService,

  ) { }

  ngOnInit() {
  }

  downloadPDF(item) {
    // console.log(item);
    let x: any = [];
    item.forEach(v => {
      let rows = [v.lab_code, v.lab_name, v.lab_result + ' ' + v.standard_result, v.date_serv + ' ' + v.time_serv];
      x.push(rows)
    });

    // console.log(x);
    let col_profile = ["hn", "cid", "name", "type"];
    let columns = ["lab_name", "lab_label", "lab_result", "date"];

    let doc = new jsPDF('portrait', 'px', 'a4');
    doc.autoTable(columns, x); // typescript compile time error
    doc.save('table.pdf');
  }

  async open(info: any = null) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      centered: false
    });
    console.log(info);
    // let _hn = info.pid;
    // let _dateServ = info.date_serv;
    try {
      let rs: any = await this.hisVisitService.getService(info.pid, info.date_serv);
      if (rs.ok) {
        this.items = rs.rows;
        this.profile = rs.profile;
        console.log(this.profile);
        console.log(this.items);
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
