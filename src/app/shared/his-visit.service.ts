import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HisVisitService {
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
  async getVisit(info: any) {
    const _url = `${this.apiUrl}/services/ovstInfo`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }
  async getService(hn: any, dateServ: any) {
    // console.log('visit');
    const _url = `${this.apiUrl}/services/view/${hn}/${dateServ}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getInfo() {
    const _url = `${this.apiUrl}/visit`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectHcode( hcode: any) {
    const _url = `${this.apiUrl}/visit/selectHcode/${hcode}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectDate( date: any) {
    const _url = `${this.apiUrl}/visit/selectDate/${date}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectHcodeDate( hcode: any,date: any) {
    const _url = `${this.apiUrl}/visit/selectHcodeDate/${hcode}/${date}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getSelectHn( hn: any) {
    const _url = `${this.apiUrl}/visit/selectHn/${hn}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(info: object) {
    const _url = `${this.apiUrl}/visit`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async update(info: object, vn: any) {
    const _url = `${this.apiUrl}/visit/${vn}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

  async accepted(info: object, vn: any) {
    const _url = `${this.apiUrl}/visit/accepted/${vn}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }
  
  async delete(vn: any) {
    const _url = `${this.apiUrl}/visit/${vn}`;
    return this.httpClient.delete(_url,this.httpOptions).toPromise();
  }


}
