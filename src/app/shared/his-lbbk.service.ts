import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HisLbbkService {
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

  async getInfo() {
    const _url = `${this.apiUrl}/lbbl`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectHn( hn: any) {
    let info = {
      hn:hn
    }
    const _url = `${this.apiUrl}/pt/getPtInfo`;
    return this.httpClient.post(_url,info ,this.httpOptions).toPromise();
  }
  async getSelectLabcode( labcode: any) {
    const _url = `${this.apiUrl}/lab/selectLab/${labcode}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }
  async getSelectVn( vn: any) {
    const _url = `${this.apiUrl}/lbbk/selectVn/${vn}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(info: object) {
    const _url = `${this.apiUrl}/lbbk`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async update(info: object, id: any) {
    const _url = `${this.apiUrl}/lbbk/${id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

  async delete(id: any) {
    const _url = `${this.apiUrl}/lbbk/${id}`;
    return this.httpClient.delete(_url,this.httpOptions).toPromise();
  }


}
