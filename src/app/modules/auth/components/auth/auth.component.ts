import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {IUser} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessagingService} from '../../../../shared/services/messaging.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public user: IUser;
  public username: string;
  public password: string;
  public isLoaded: boolean;

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private messaging: MessagingService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.user = authService.currentUserValue.user;
    }
  }

  ngOnInit() {
    this.isLoaded = true;
    if (this.user) {
      return this.router.navigate(['/search']);
    }
  }

  auth() {
    if (!this.form.valid) {
      return;
    }
    this.isLoaded = false;
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        () => {
          return this.router.navigate(['/search']);
        },
        () => {
          this.isLoaded = true;
        });
  }

}
