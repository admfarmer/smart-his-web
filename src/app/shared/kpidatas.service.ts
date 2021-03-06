import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KpiDatasService {
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

  async getKpiInfo() {
    const _url = `${this.apiUrl}/kpi/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getKpiYears() {
    const _url = `${this.apiUrl}/kpi/years/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getKpiYearitem(info: any) {
    let years_id = info.years_id;
    let kpi_id = info.kpi_id;
    const _url = `${this.apiUrl}/kpi/datas/${years_id}/${kpi_id}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async getKpiDatasInfo() {
    const _url = `${this.apiUrl}/kpi/datas/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(info: object) {
    const _url = `${this.apiUrl}/kpi/datas/insert`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async update(info: object, id: any) {
    const _url = `${this.apiUrl}/kpi/datas/${id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

}
