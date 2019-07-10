import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { OvsitdxService } from 'src/app/shared/ovsitdx.service';
import * as moment from 'moment';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-ovsitdx',
  templateUrl: './ovsitdx.component.html',
  styles: []
})
export class OvsitdxComponent implements OnInit {
  items: any = [];
  info: any = {};
  dateTo: any = Date();
  messages: any;
  constructor(
    private alertService: AlertService,
    private ovsitdxService: OvsitdxService
  ) { }

  ngOnInit() {
    this.getList();
  }

  setupRefresh() {
    setTimeout(() => {
      location.reload();
    }, 50000);
  }

  async getList() {
    try {
      const rs: any = await this.ovsitdxService.list();

      if (rs.info.length > 0) {
        this.items = rs.info;
        // console.log(this.items);
        this.items.forEach(v => {
          const rsx: any = this.ovsitdxService.save(v);
        });
        this.setupRefresh();
      } else {
        // console.log(rs.message);
        this.alertService.success('ไม่พบข้อมูล ค้างสั่ง', 'OK');
        this.setupRefresh();

      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

}
