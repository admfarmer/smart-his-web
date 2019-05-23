import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { SmardcardService } from 'src/app/shared/smardcard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  items: any = [];
  info: any = {};

  constructor(
    private alertService: AlertService,
    private smardcardService: SmardcardService,

  ) { }

  ngOnInit() {
    // this.getInfo();
  }
  async getInfo() {
    try {
      const rs: any = await this.smardcardService.getInfo();
      if (rs.statusCode === 200) {
        this.items = rs;
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
