import {Component, OnInit} from '@angular/core';
import {AlertMessage} from '../../../app.component';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  public array: AlertMessage[] = [];
  public data: AlertMessage;

  constructor(
    private messaging: MessagingService
  ) {
  }

  ngOnInit() {
    this.messaging.of(AlertMessage).subscribe(message => {
      this.data = message;
      this.array.push(message);
      setTimeout(() => {
        this.array[0].status = false;
      }, 2000);
      setTimeout(() => {
        this.array.pop();
      }, 3000);
    });
  }

  getClasses(data: AlertMessage) {
    const classes = [];
    if (data.status) {
      classes.push('show');
    }
    if (data.isDanger) {
      classes.push('danger');
    }
    return classes.join(' ');
  }

}
