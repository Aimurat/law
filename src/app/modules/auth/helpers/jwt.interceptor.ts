import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {finalize} from 'rxjs/operators';
import {MessagingService} from '../../../shared/services/messaging.service';
import {LoadingMessage} from '../../../app.component';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  public activeRequests = 0;

  constructor(
    private messaging: MessagingService,
    private authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${currentUser.token}`
        }
      });
    }
    if (this.activeRequests === 0) {
      this.messaging.publish(new LoadingMessage('Загрузка', false));
    }
    this.activeRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.messaging.publish(new LoadingMessage('Загрузка', true));
        }
      })
    );
  }
}
