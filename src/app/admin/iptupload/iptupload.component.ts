import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileuploadService } from '../../shared/fileupload.service';
import { AlertService } from '../../shared/alert.service';
import { HisIptService } from '../../shared/his-ipt.service';

@Component({
  selector: 'app-iptupload',
  templateUrl: './iptupload.component.html',
  styleUrls: []
})
export class IptuploadComponent {
  // @ViewChild('modalUpload') public modalUpload: any;
  items: any = [];

  filePath: string;
  fileName: any;
  files: Array<any> = [];
  isUpoading: boolean = false;

  isupdate: boolean = false;
  open: Boolean = false;
  isUploading = false;
  loadingFiles = false;

  fieldName: any;
  filesToUpload: Array<File>;
  documentCode: any;
  token: any;
  // an: any;
  document_id: any;
  file_name: any;
  hnText: any;
  select: any = 'HN';

  constructor(
    private alertService: AlertService,
    private uploadingService: FileuploadService,
    private hisIptService: HisIptService,
    @Inject('DOC_URL') private docUrl: string,
    @Inject('IPT_PREFIX') public docPrefix: string,
  ) { }

  ngOnInit() {
    this.getIptInfo();
  }

  async getIptInfo() {
    try {
      if (this.select == 'HN') {
        const rs: any = await this.hisIptService.getIptInfo(this.hnText);
        if (rs.info) {
          this.items = [];
          let _items = rs.info;
          _items.forEach(v => {
            this.getFilesList(v);
          });
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      } else {
        const rs: any = await this.hisIptService.getIptAn(this.hnText);
        if (rs.info) {
          this.items = [];
          let _items = rs.info;
          _items.forEach(v => {
            this.getFilesList(v);
          });
        } else {
          this.alertService.error('เกิดข้อผิดพลาด');
        }
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }


  // file upload
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = [];
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  async upload(_an: any) {

    this.isUploading = true;
    this.documentCode = _an;
    console.log(this.documentCode);
    console.log(this.filesToUpload);

    try {
      const result: any = await this.uploadingService.makeFileRequest(this.documentCode, this.filesToUpload)
      this.isUploading = false;
      if (result.ok) {
        this.filesToUpload = [];
        this.alertService.success();
        this.getIptInfo();
      } else {
        this.alertService.error(JSON.stringify(result.error));
      }

    } catch (error) {
      this.isUploading = false;
      this.alertService.error(JSON.stringify(error));
    }
  }

  async getFilesList(v: any) {
    let _document_id: any;
    let _file_name: any;
    let _no: any;
    this.files = [];
    this.loadingFiles = true;
    let result: any = await this.uploadingService.getFiles(v.an);
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
      rgtdate: v.rgtdate,
      daycnt: v.daycnt,
      document_id: _document_id,
      file_name: _file_name
    }
    console.log(_info);
    this.items.push(_info);
    this.loadingFiles = false;

  }

  getFile(documentId) {
    const url = `${this.docUrl}/uploads/files/${documentId}`;
    window.open(url, '_blank');
  }

  async removeFile(documentId, idx) {
    this.alertService.confirm('คุณต้องการลบไฟล์นี้ ใช่หรือไม่?')
      .then(() => {
        this.uploadingService.removeFile(documentId)
        this.getIptInfo();
      })
      .catch(() => {
        // cancel
      });
  }

}
