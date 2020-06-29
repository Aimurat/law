import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAuth} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../shared/services/api.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<IAuth>;
  public currentUser: Observable<IAuth>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiService
  ) {
    this.currentUserSubject = new BehaviorSubject<IAuth>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IAuth {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.api.API_URL}/api/auth/login/`, {username, password})
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    console.clear();
    this.router.navigate(['/login']);
  }

}
