import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private message$: Subject<Message>;

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish<T>(message: T): void {
    const channel = (message.constructor as any).name;
    this.message$.next({channel, data: message});
  }

  public of<T>(messageType: new(...args: any[]) => T): Observable<T> {
    const channel = (messageType as any).name;
    return this.message$.pipe(
      filter(m => m.channel === channel),
      map(m => m.data)
    );
  }


}
