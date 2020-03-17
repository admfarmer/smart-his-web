import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HisIncothService {
  token: any;
  httpOptions: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  async getInfo(hn: any, vstdttm: any) {
    const _url = `${this.apiUrl}/incoth/info/${hn}/${vstdttm}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getDebtorInfo() {
    const _url = `${this.apiUrl}/incoth/selectDebtor`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getInfoViews(hn: any, vstdttm: any) {
    const _url = `${this.apiUrl}/incoth/infoOvst/${hn}/${vstdttm}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }
  async getIncothVn(vn: any) {
    const _url = `${this.apiUrl}/incoth/incothVn/${vn}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async updateDebtor(info: object, vn: any) {
    const _url = `${this.apiUrl}/incoth/updateDebtor/${vn}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }
  async update(info: object, id: any) {
    const _url = `${this.apiUrl}/incoth/${id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

  async updateRcpt(info: object, vn: any) {
    const _url = `${this.apiUrl}/incoth/updatercpt/${vn}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

  async updateOvst(info: object, vn: any) {
    const _url = `${this.apiUrl}/incoth/updateovst/${vn}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }


}
