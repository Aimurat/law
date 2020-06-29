import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient, api: ApiService) {
    super(http, api);
  }

  static months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек'
  ];

  static getIconText(name: string) {
    const array = name.split(' ');
    let str = '';
    array.forEach(a => {
      str += a.charAt(0);
    });
    return str.slice(0, 2);
  }

  static getEndOfNumber(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

}
