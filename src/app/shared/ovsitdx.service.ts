import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OvsitdxService {
  token: any;
  httpOptions: any;
  httpLine: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    this.httpLine = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer n9XdwQop63zVEdTvOkz4tGUz90LbIosbjmQYXVSM6EN'
      })
    };
  }


  async list() {
    const _url = `${this.apiUrl}/ovst/getOvstdx`;
    return this.httpClient.post(_url, this.httpOptions).toPromise();
  }

  async infoVn() {
    const _url = `${this.apiUrl}/diag/infoVn`;
    return this.httpClient.post(_url, this.httpOptions).toPromise();
  }

  async save(datas: object) {
    const _url = `${this.apiUrl}/diag/getDiag`;
    return this.httpClient.post(_url, datas, this.httpOptions).toPromise();
  }

  async sendBotLine(messages) {
    const _url = `${this.apiUrl}/ovst/botline`;
    return this.httpClient.post(_url, messages.toString(), this.httpLine).toPromise();
  }
}
