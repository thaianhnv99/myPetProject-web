import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserServiceService} from '../pages/services/user-service.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../core/auth/services/auth.service';
import {environment} from '../../environments/environment';
import {USER_PROFILE} from '../core/utils/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date: any;
  user: User = new User();

  constructor(
    private userServiceService: UserServiceService,
    private auth: AuthService,
    private route: Router,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.date = new Date();
    this.user.username = 'admin3';
    this.user.password = '123';
  }

  login() {
    const authData = {
      username: this.user.username,
      password: this.user.password
    };
    this.auth.login(authData.username, authData.password).subscribe(res => {
      console.log(res);
      localStorage.setItem(environment.authTokenKey, res.body.token);
      if (res.body && res.body.userInfo) {
        localStorage.setItem(USER_PROFILE, JSON.stringify(res.body.userInfo));
        this.user = res.body.userInfo;
        this.route.navigate(['/pages']);
      } else {
        this.toastrService.error('username or password error');
      }
    });
  }
}
