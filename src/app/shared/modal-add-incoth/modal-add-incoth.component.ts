import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { HisIncothService } from '../his-incoth.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-add-incoth',
  templateUrl: './modal-add-incoth.component.html',
  styles: []
})
export class ModalAddIncothComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  info: any = {};

  id: any;
  namecost: any;
  rcptamt: any;

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
    // console.log(info);
    if (info.id) {
      this.id = info.id;
      this.namecost = info.namecost;
      this.rcptamt = info.rcptamt;
    } else {
      this.namecost = null;
      this.rcptamt = null;
    }
    this.modalReference.result.then((result) => { });
  }

  dismiss() {
    this.modalReference.close();
    this.id = null;
    this.namecost = null;
    this.rcptamt = null;
  }

  async save() {

    let _info = {
      rcptamt: this.rcptamt,
    }
    // console.log(_info);
    if (this.id && this.rcptamt) {
      try {
        let _id = this.id;
        // console.log("edit data");
        let rs: any = await this.hisIncothService.update(_info, _id);
        // console.log(rs.info);
        if (rs.info) {
          this.modalReference.close();
          this.onSave.emit();
          this.id = null;
          this.namecost = null;
          this.rcptamt = null;
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
