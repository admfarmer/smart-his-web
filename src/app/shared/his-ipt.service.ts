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

  async getIptInfo(hn: any) {
    const _url = `${this.apiUrl}/ipt/info/${hn}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
