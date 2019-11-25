import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { HisIptService } from 'src/app/shared/his-ipt.service';
import { FileuploadService } from '../../shared/fileupload.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-iptreport',
  templateUrl: './iptreport.component.html',
  styleUrls: []
})
export class IptreportComponent implements OnInit {
  items: any = [];
  info: any = {};
  searchText: string;

  files: Array<any> = [];
  loadingFiles = false;

  total = 0;
  pageSize = 20;
  maxSizePage = 5;
  currentPage = 1;
  offset = 0;

  constructor(
    private alertService: AlertService,
    private hisIptService: HisIptService,
    private fileuploadService: FileuploadService,
  ) { }

  ngOnInit() {
    this.getIptSelect();
  }

  onPageChange(event: any) {

    // const _currentPage = +event;
    // let _offset = 0;
    // _offset = (_currentPage - 1) * this.pageSize;

    // this.offset = _offset;

    // let _offset = 1;
    this.offset = this.offset + this.pageSize;
    this.getIptSelect();
  }


  async getIptSelect() {
    let _limit: number = this.pageSize || 20;
    let _offset: number = this.offset || 0;
    try {
      const rs: any = await this.hisIptService.getIptSelect(_limit, _offset);
      if (rs.info) {
        let _items = rs.info;
        _items.forEach(v => {
          // console.log(v);
          this.getFilesList(v);
        });

      } else {
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

  async getFilesList(v: any) {
    let _document_id: any;
    let _file_name: any;
    let _no: any;
    this.files = [];
    this.loadingFiles = true;
    let result: any = await this.fileuploadService.getFiles(v.an);
    if (result.rows) {
      _document_id = result.rows.document_id,
        _file_name = result.rows.file_name
    } else {
      _document_id = null;
      _file_name = null;
    }

    let _info = {
      an: v.an,
      fullname: v.fullname,
      ward: v.ward,
      prediag: v.prediag,
      doctorname: v.doctorname,
      rgtdate: v.rgtdate,
      daycnt: v.daycnt,
      document_id: _document_id,
      file_name: _file_name
    }
    console.log(_info);
    this.items.push(_info);
    this.loadingFiles = false;

  }

}
