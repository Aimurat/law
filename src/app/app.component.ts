import { Component } from '@angular/core';

export class LoadingMessage {
  constructor(public message: string, public status: boolean) {
  }
}

export class AlertMessage {
  constructor(public message: string, public status: boolean, public isDanger = false) {
  }
}

export class PopupMessage {
  constructor(public message: string, public status: boolean) {
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sud';
}
