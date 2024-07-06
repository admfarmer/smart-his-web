import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { HisVisitService } from 'src/app/shared/his-visit.service';
import { ModalDetailVisitComponent } from 'src/app/shared/modal-detail-visit/modal-detail-visit.component';

import * as moment from 'moment';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styles: []
})
export class VisitComponent implements OnInit {
  @ViewChild('mdlVisitDetail') private mdlVisitDetail: ModalDetailVisitComponent;

  items: any = [];
  itemService: any = [];
  info: any = {};
  searchText: string;

  hn: any;
  cid: any;
  select: any = 'hn';
  text: any;
  constructor(
    private alertService: AlertService,
    private hisVisitService: HisVisitService
  ) { }

  openEdit(item: any) {
    // console.log(item);
    this.mdlVisitDetail.open(item);
  }

  onSave(event: any) {
    // this.alertService.success();
  }

  ngOnInit() {
  }

  async gitVisit() {
    if (this.select == 'hn') {
      this.hn = this.text;
    } else if (this.select == 'cid') {
      this.cid = this.text;
    }

    this.info = {
      hn: this.hn,
      cid: this.cid
    }
    try {
      const rs: any = await this.hisVisitService.getVisit(this.info);
      if (rs.info.length > 0) {
        this.items = rs;
        // console.log(this.items);
      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getService(items: any) {
    // console.log(items);
    let _hn = items.hn;
    let _dateServ = items.dateServ;
    try {
      const rs: any = await this.hisVisitService.getService(_hn, _dateServ);
      if (rs.info.length > 0) {
        this.itemService = rs.info;
        // console.log(this.itemService);
      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }

  }

}
