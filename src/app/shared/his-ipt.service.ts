import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HisIptService {
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

  async getIptSelect(limit: number, offset: number) {
    const _url = `${this.apiUrl}/ipt/select?limit=${limit}&offset=${offset}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getIptInfo(hn: any) {
    const _url = `${this.apiUrl}/ipt/info/${hn}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getIptAn(an: any) {
    const _url = `${this.apiUrl}/ipt/infoAn/${an}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
