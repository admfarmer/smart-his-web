import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert.service';
import { HisVisitService } from '../his-visit.service';
import { HisLbbkService } from '../his-lbbk.service';
import {HisClnService} from '../his-cln.service';
import * as moment from 'moment'

@Component({
  selector: 'app-modal-sso-visit',
  templateUrl: './modal-sso-visit.component.html',
  styleUrls: ['./modal-sso-visit.component.css']
})
export class ModalSsoVisitComponent implements OnInit {

  @Output('onSave') onSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') public content: any;

  modalReference: NgbModalRef;
  items: any = [];
  itemPt: any = [];
  itemClns: any = [];
  itemIcd10: any = [];
  itemLabcode: any = [];
  info: any = {};
  dateTo: any = Date();

  vn: any;
  hn: any;
  cid: any;
  vstdttm: any;
  icd10: any;
  cln: any;
  pttype: any;
  pname: any;
  fname: any;
  lname: any;
  sex: any;
  birthdate: any;
  hcode: any;
  cc: any;


  icd10name:any;
  namecln:any;

  lbbk_labname:any;
  lbbk_labcode:any;
  lbbk_id:any;
  lbbk_vn:any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private hisVisitService: HisVisitService,
    private hisLbbkService: HisLbbkService,
    private hisClnService: HisClnService,
  ) { }

  ngOnInit() {
    console.log('sso visit');
    this.hcode = sessionStorage.getItem('hcode');

  }

  async open(info: any) {
    this.modalReference = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      centered: false
    });

    console.log(info);

    if(info){
      this.vn = info.vn;
      this.hn = info.hn;
      this.cid = info.cid;
      this.vstdttm = moment(info.vstdttm).format('YYYY-MM-DD HH:mm:ss');
      this.icd10 = info.icd10;
      this.cln = info.cln;
      this.pttype = info.pttype;
      this.pname = info.pname;
      this.fname = info.fname;
      this.lname = info.lname;
      this.sex = info.sex;
      this.birthdate = moment(info.birthdate).format('YYYY-MM-DD');
      this.hcode = info.hcode;  
      this.cc = info.cc;  

      this.selectVn(info.vn);
      this.getCln(this.cln);
      this.getIcd10(this.icd10);

    }else{

      this.vn = '';
      this.hn = '';
      this.cid = '';
      this.vstdttm = moment(this.dateTo).format('YYYY-MM-DD HH:mm:ss');
      this.icd10 = '';
      this.cln = '';
      this.pttype = '';
      this.pname = '';
      this.fname = '';
      this.lname = '';
      this.sex = '';
      this.birthdate = '';
      this.hcode = this.hcode;  
      this.cc = '';
      this.lbbk_labname = '';
      this.lbbk_labcode = '';
    
      this.items = [];
      this.itemPt = [];
      this.itemClns = [];
      this.itemIcd10 = [];
      this.itemLabcode = [];
    

    }

    this.modalReference.result.then((result) => { });
  }

  async selectVn(vn:any){
    try {
      let rs: any = await this.hisLbbkService.getSelectVn(vn);
      console.log(rs);
      if (rs.results.length > 0) {
        this.items = rs.results;
        // console.log(this.items);
      } else {
        console.log(rs.message);
      }

    } catch (error) {
      console.log(error);
      // this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  dismiss() {
    this.items = [];
    this.itemPt = [];
    this.itemClns = [];
    this.itemIcd10 = [];
    this.itemLabcode = [];

    this.modalReference.close();
  }

  async getCln(cln){
    try {
      let rs: any = await this.hisClnService.getInfoCln(cln);
      // console.log(rs.info);
      if (rs.info.length > 0) {
        this.itemClns = rs.info;
        // console.log(this.itemClns);
        this.namecln = this.itemClns[0].namecln;
      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getIcd10(icd10){
    // console.log(icd10);
    try {
      let rs: any = await this.hisClnService.getInfoIcd10(icd10);
      // console.log(rs);
      if (rs.info.length > 0) {
        this.itemIcd10 = rs.info;
        // console.log(this.itemIcd10);
        this.icd10name = this.itemIcd10[0].icd10name;
      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getLabcpde(lbbk_labcode){
    // console.log(labcode);
    try {
      let rs: any = await this.hisLbbkService.getSelectLabcode(lbbk_labcode);
      // console.log(rs);
      if (rs.info.length > 0) {
        this.itemLabcode = rs.info;
        // console.log(this.itemLabcode);
        this.lbbk_labname = this.itemLabcode[0].labname;
      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getHn(hn){
    // console.log(labcode);
    try {
      let rs: any = await this.hisLbbkService.getSelectHn(hn);
      console.log(rs);
      if (rs.info) {
        this.itemPt = rs.info;
        // console.log(this.itemPt);

        this.vn = rs.info.vn;
        this.hn = rs.info.hn;
        this.cid = rs.info.cid;
        // this.vstdttm = moment(rs.info.vstdttm).format('YYYY-MM-DD HH:mm:ss');
        this.icd10 = rs.info.icd10;
        this.cln = rs.info.cln;
        this.pttype = rs.info.pttype;
        this.pname = rs.info.title;
        this.fname = rs.info.firstname;
        this.lname = rs.info.lastname;
        this.sex = rs.info.sex;
        this.birthdate = moment(rs.info.birthdate).format('YYYY-MM-DD');
  

      } else {
        console.log(rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  inputCln(cln){
    console.log(cln);
    this.getCln(this.cln);
  }

  inputIcd10(icd10){
    console.log(icd10);
    this.getIcd10(this.icd10);
  }

  inputLabcode(labcode){
    console.log(labcode);
    this.getLabcpde(this.lbbk_labcode);

  }  
  inputHn(hn){
    console.log(hn);
    this.getHn(this.hn);

  }

  async save_visit(){

    if(this.vn){
      let info = {
        hn:this.hn,
        cid:this.cid,
        vstdttm:this.vstdttm,
        icd10:this.icd10,
        cln:this.cln,
        pttype:this.pttype,
        pname:this.pname,
        fname:this.fname,
        lname:this.lname,
        sex:this.sex,
        birthdate:this.birthdate,
        hcode:this.hcode,
        cc:this.cc 
        }
        console.log(this.vn);
        console.log(info);

    }else{
      let info = {
        hn:this.hn,
        cid:this.cid,
        vstdttm:this.vstdttm,
        icd10:this.icd10,
        cln:this.cln,
        pttype:this.pttype,
        pname:this.pname,
        fname:this.fname,
        lname:this.lname,
        sex:this.sex,
        birthdate:this.birthdate,
        hcode:this.hcode,
        cc:this.cc 
        }
        console.log(info);
        let rs: any = await this.hisVisitService.save(info);
        console.log(rs);
        if(rs){

          this.vn = rs.rows;
        }


    }

  }

  async save_lbbk(){

    let id = this.lbbk_id;
    let vn = this.lbbk_vn;
    let labname = this.lbbk_labname;
    let labcode = this.lbbk_labcode;

    console.log(id);
    
    if(id){

      let info = {
        vn:vn,
        labname:labname,
        labcode:labcode,
        vstdttm:this.vstdttm,
        hcode:this.hcode,
      }
      console.log('data : ',info);
      console.log('id : ',id);

    } else {
      let info = {
        vn:this.vn ,
        labname:labname,
        labcode:labcode,
        vstdttm:this.vstdttm,
        hcode:this.hcode,
      }
      console.log(info);
      try {
        let rs: any = await this.hisLbbkService.save(info);
        console.log(rs);
        this.selectVn(this.vn);
      } catch (error) {
        console.log(error);
      }
      
    }

  }

  edit(i){
    console.log(i);
    this.lbbk_labcode = i.labcode;
    this.lbbk_labname = i.labname;
    this.lbbk_id = i.id;
    this.lbbk_vn = i.vn;
  }

  async onDelete(i){
    console.log(i);

    try {
      const rs: any = await this.hisLbbkService.delete(i.id);
      this.selectVn(i.vn);
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

  
}
