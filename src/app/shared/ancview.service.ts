import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AncviewService {
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
    const _url = `${this.apiUrl}/ancview/ovstInfo`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }
  async getService(hn: any, dateServ: any) {
    const _url = `${this.apiUrl}/ancview/view/${hn}/${dateServ}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
