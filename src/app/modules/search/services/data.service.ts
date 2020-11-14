import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../../../shared/services/api.service';
import {Act, ActGroup, Category, IResult, Item, Predict} from '../models/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject({
    first_instances: [],
    cassations: [],
    appeals: []
  });

  private intellectualDataSubject = new BehaviorSubject<Category[]>([{
    code: '',
    id: -1,
    name: '',
    probability: -1
  }]);

  data = this.dataSubject.asObservable();
  intellectualData = this.intellectualDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
  }

  saveResponse(data) {
    const jsonString = JSON.stringify(data);
    localStorage.setItem('response', jsonString);
    this.dataSubject.next(data);
  }

  saveIntellectualResponse(data) {
    const jsonString = JSON.stringify(data);
    localStorage.setItem('categories', jsonString);
    this.intellectualDataSubject.next(data);
  }

  getActs(category: Category) {
    return this.http.post(this.api.API_URL + '/api/main/smart/similar/', {
      text: localStorage.getItem('text'),
      classification: category.code,
      start_date: localStorage.getItem('start_date'),
      end_date: localStorage.getItem('end_date')
    }).pipe(map(data => data as IResult));
  }

  // searchActs() {
  //   return this.http.post(this.api.API_URL + '/api/main/outliers/search/', {
  //     text: localStorage.getItem('text'),
  //     start_date: localStorage.getItem('start_date'),
  //     end_date: localStorage.getItem('end_date')
  //   }).pipe(map(data => data as ActGroup[]));
  // }

  getResultPredict(classification: string) {
    return this.http.post(this.api.API_URL + '/api/main/result_predict/', {
      text: localStorage.getItem('text'), classification
    }).pipe(map(response => response as Predict[]));
  }

  getAct(id: number, instance: string) {
    return this.http.get(this.api.API_URL + `/api/main/${instance}/${id}/`)
      .pipe(map(a => a as Act));
  }

  getCourts(): Observable<Item[]> {
    const queryUrl = this.api.API_URL + '/api/main/courts/';
    return this.http.get(queryUrl).pipe(map(response => response as Item[]));
  }

  getClassifications(): Observable<Item[]> {
    const queryUrl = this.api.API_URL + '/api/main/classifications/';
    return this.http.get(queryUrl).pipe(map(response => response as Item[]));
  }

  getRegions(): Observable<Item[]> {
    const queryUrl = this.api.API_URL + '/api/main/regions/';
    return this.http.get(queryUrl).pipe(map(response => response as Item[]));
  }

  getJudges(): Observable<Item[]> {
    const queryUrl = this.api.API_URL + '/api/main/judges/';
    return this.http.get(queryUrl).pipe(map(response => response as Item[]));
  }

  getResults(): Observable<Item[]> {
    const queryUrl = this.api.API_URL + '/api/main/results/';
    return this.http.get(queryUrl).pipe(map(response => response as Item[]));
  }

  postKeywords(searchKeywords: any, controls: any) {
    const jsonString = JSON.stringify(controls);
    localStorage.setItem('searchKeywords', jsonString);
    return this.http.post(this.api.API_URL + '/api/main/es/keyword/', searchKeywords);
  }

  postIntellectual(text: any) {
    localStorage.setItem('text', text.text);
    localStorage.setItem('start_date', text.start_date);
    localStorage.setItem('end_date', text.end_date);
    return this.http.post(this.api.API_URL + '/api/main/predict/classifications/', text);
  }

  dePersonalize(type: string, id: number) {
    return this.http.get(this.api.API_URL + `/api/main/${type}/${id}/personalize/`);
  }

  getSynonyms(text: string) {
    return this.http.post(this.api.API_URL + '/api/main/w2v/similar/', {
      text: text
    }).pipe(map(response => response as { synonyms: string }));
  }

}
