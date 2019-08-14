import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KpiYearsService {
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

  async getKpiYears() {
    const _url = `${this.apiUrl}/kpi/years/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  async save(info: object) {
    const _url = `${this.apiUrl}/kpi/years/insert`;
    return this.httpClient.post(_url, info, this.httpOptions).toPromise();
  }

  async update(info: object, id: any) {
    const _url = `${this.apiUrl}/kpi/years/${id}`;
    return this.httpClient.put(_url, info, this.httpOptions).toPromise();
  }

}
