import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { HisVisitService } from 'src/app/shared/his-visit.service';
import { ModalSsoVisitComponent } from 'src/app/shared/modal-sso-visit/modal-sso-visit.component';

import * as moment from 'moment';

@Component({
  selector: 'app-sso-visit',
  templateUrl: './sso-visit.component.html',
  styleUrls: ['./sso-visit.component.css']
})
export class SsoVisitComponent implements OnInit {
  @ViewChild('mdlSsoVisit') private mdlSsoVisit: ModalSsoVisitComponent;

  items: any = [];
  info: any = {};
  dateTo: any = Date();
  hcode:any;
  search:any;

  constructor(
    private alertService: AlertService,
    private hisVisitService: HisVisitService  
  ) { }

  ngOnInit() {
    console.log(sessionStorage.getItem('hcode'));
    
    this.hcode = sessionStorage.getItem('hcode');
    this.search = moment(this.dateTo).format('YYYY-MM-DD');
    // this.getList(this.hcode,date);
    this.onSearch();
  }

  openEdit(item:any){
    console.log(item);
    this.mdlSsoVisit.open(item);

  }

  onSave(event: any) {
    // this.alertService.success();
  }

  onSearch(){
    this.items=[];
    this.getList(this.hcode,this.search);
  }

  async onAccepted(i){
    console.log(i);
    let info = {
      accepted:'Y'
    }
    let rs: any = await this.hisVisitService.accepted(info,i.vn);
    this.getList(this.hcode,this.search);

  }
  async onCancel(i){
    console.log(i);
    let info = {
      accepted:'C'
    }
    let rs: any = await this.hisVisitService.accepted(info,i.vn);
    this.getList(this.hcode,this.search);

  }

  async getList(_hcode:any,_date:any) {
    try {
      if(this.hcode == '10957'){
        const rs: any = await this.hisVisitService.getSelectDate(_date);
        if (rs.results.length > 0) {
          this.items = rs.results;
          console.log(this.items);
        } else {
          console.log(rs.message);
        }
      }else{
        const rs: any = await this.hisVisitService.getSelectHcodeDate(_hcode,_date);
        if (rs.results.length > 0) {
          this.items = rs.results;
          console.log(this.items);
        } else {
          console.log(rs.message);
        }
      }

    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }
  async Delete(i){
    console.log(i);

    try {
      const rs: any = await this.hisVisitService.delete(i.vn);
      // let date = moment(this.dateTo).format('YYYY-MM-DD');
      // this.getList(this.hcode,date);
      this.onSearch();

  
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

}
