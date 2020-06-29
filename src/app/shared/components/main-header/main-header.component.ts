import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {IUser} from '../../../modules/auth/models/user.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public url;
  public isResult: boolean;
  public isAct: boolean;
  public user: IUser;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.user = this.authService.currentUserValue.user;
    }
    this.router.events.subscribe(() => {
      this.url = this.router.url;
      if (this.url === '/search') {
        this.isResult = false;
        this.isAct = false;
      }
      if (this.url === '/result') {
        this.isResult = true;
        this.isAct = false;
      }
      if (this.url.includes('/act')) {
        this.isResult = true;
        this.isAct = true;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
