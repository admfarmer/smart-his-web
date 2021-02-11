import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HisClnService {
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
    const _url = `${this.apiUrl}/cln/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getInfoCln(cln) {
    const _url = `${this.apiUrl}/cln/infoCln/${cln}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getInfoIcd10(icd10) {
    const _url = `${this.apiUrl}/icd10/selectIcd10/${icd10}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }


}
