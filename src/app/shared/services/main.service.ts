import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiService} from './api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    protected http: HttpClient,
    protected api: ApiService) {
  }

  static formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static normalBody(body: any): any {
    if (!body) {
      body = {};
    }
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      if (body[key] instanceof Date) {
        body[key] = MainService.formatDate(body[key]);
      }
    }
    return body;
  }

  static getUrlParams(body: any): HttpParams {
    let params = new HttpParams();
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      params = params.append(key, body[key]);
    }
    return params;
  }

  get(uri: string, body: any): Promise<any> {
    body = MainService.normalBody(body);
    const pars = MainService.getUrlParams(body);
    return this.http.get(this.api.API_URL + uri, {params: pars}).toPromise().then(res => res);
  }

  post(uri: string, body: any): Promise<any> {
    body = MainService.normalBody(body);
    return this.http.post(this.api.API_URL + uri, body).toPromise().then(res => res);
  }

  delet(uri: string, body: any): Promise<any> {
    body = MainService.normalBody(body);
    return this.http.delete(this.api.API_URL + uri, body).toPromise().then(res => res);
  }

  put(uri: string, body: any): Promise<any> {
    body = MainService.normalBody(body);
    return this.http.put(this.api.API_URL + uri, body).toPromise().then(res => res);
  }

}
