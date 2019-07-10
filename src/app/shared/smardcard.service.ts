import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SmardcardService {

    constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) { }

    async getInfo() {
        const _url = `https://localhost:8443/smartcard/data/`;
        return this.httpClient.get(_url).toPromise();
    }
}
