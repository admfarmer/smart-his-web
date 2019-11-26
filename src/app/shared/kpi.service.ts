import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
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

  async getStgInfo() {
    const _url = `${this.apiUrl}/kpi/stg/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }
  async getStgSelect() {
    const _url = `${this.apiUrl}/kpi/stg/select`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async saveStg(info: object) {
    const _url = `${this.apiUrl}/kpi/stg/insert`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async updateStg(info: object, stg_id: any) {
    const _url = `${this.apiUrl}/kpi/stg/update/${stg_id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }


  async getKpiDetail(kpi_id: any) {
    const _url = `${this.apiUrl}/kpi/kpidetail/${kpi_id}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getKpiInfo() {
    const _url = `${this.apiUrl}/kpi/select`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(info: object) {
    const _url = `${this.apiUrl}/kpi/insert`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async update(info: object, kpi_id: any) {
    const _url = `${this.apiUrl}/kpi/${kpi_id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

}
