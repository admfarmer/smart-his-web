import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { HisIncothService } from 'src/app/shared/his-incoth.service';
import * as moment from 'moment';
import { ModalAddIncothComponent } from 'src/app/shared/modal-add-incoth/modal-add-incoth.component';

@Component({
  selector: 'app-hisincoth',
  templateUrl: './hisincoth.component.html',
  styles: []
})
export class HisincothComponent implements OnInit {

  @ViewChild('mdlIncoth') private mdlIncoth: ModalAddIncothComponent;

  items: any = [];
  info: any = {};
  searchText: string;
  hnText: string;
  vstdttmText: string;

  id: any;
  hn: any;
  vn: any;
  date: any;
  time: any;
  pttype: any;
  namepttype: any;
  cgd: any;
  income: any;
  namecost: any;
  rcptamt: any;

  constructor(
    private alertService: AlertService,
    private hisIncothService: HisIncothService
  ) { }


  ngOnInit() {
  }

  onSave(event: any) {
    // this.getKpiInfo();
    this.alertService.success();
    this.getKpiInfo();
  }

  openEdit(item: any) {
    console.log(item);
    this.mdlIncoth.open(item);
  }

  async getKpiInfo() {
    let _hnText = this.hnText;
    let _vstdttmText = moment(this.vstdttmText).format('YYYYMMDD');

    try {
      const rs: any = await this.hisIncothService.getInfo(_hnText, _vstdttmText);
      if (rs.info) {
        this.items = rs.info;
        console.log(this.items);
      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }


}
