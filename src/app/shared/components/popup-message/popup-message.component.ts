import { Component, OnInit } from '@angular/core';
import {PopupMessage} from '../../../app.component';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {

  public data: PopupMessage;

  constructor(
    private messaging: MessagingService
  ) { }

  ngOnInit() {
    this.messaging.of(PopupMessage).subscribe(response => {
      setTimeout(() => {
        this.data = response;
      });
    });
  }

}
