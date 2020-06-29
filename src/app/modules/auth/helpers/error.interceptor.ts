import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {MessagingService} from '../../../shared/services/messaging.service';
import {AlertMessage, LoadingMessage} from '../../../app.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private messaging: MessagingService,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if ([401, 403].indexOf(err.status) !== -1) {
        this.authService.logout();
        console.clear();
        this.messaging.publish(new LoadingMessage('', true));
      }

      if ([404].indexOf(err.status) !== -1) {
        console.clear();
        this.messaging.publish(new LoadingMessage('', true));
      }

      if ([400].indexOf(err.status) !== -1) {
        console.clear();
        this.messaging.publish(new LoadingMessage('', true));
      }

      const error = err.error.detail || err.error.non_field_errors || err.error.message || err.error.error || err.statusText;
      if (Array.isArray(error)) {
        error.forEach(e => {
          this.messaging.publish(new AlertMessage(e, true, true));
        });
      } else {
        this.messaging.publish(new AlertMessage(error, true, true));
      }

      return throwError(error);

    }));
  }

}
