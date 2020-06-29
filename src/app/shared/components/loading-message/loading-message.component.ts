import {Component, OnInit} from '@angular/core';
import {LoadingMessage} from '../../../app.component';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent implements OnInit {

  public data: LoadingMessage;

  constructor(
    private messaging: MessagingService
  ) {
  }

  ngOnInit() {
    this.messaging.of(LoadingMessage).subscribe(response => {
      setTimeout(() => {
        this.data = response;
      });
    });
  }


}
