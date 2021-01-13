import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {USER_PROFILE} from "../../../core/utils/constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IUser, User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date: any;
  user: User = new User();

  constructor(
    // private userServiceService: UserServiceService,
    public activeModal: NgbActiveModal,
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

  submit() {
    const authData = {
      username: this.user.username,
      password: this.user.password
    };
    this.auth.login(authData.username, authData.password).subscribe(res => {
      console.log(res);
      localStorage.setItem(environment.authTokenKey, res.body.token);
      if (res.body) {
        let userInfo = {
          id: res.body.id,
          username: res.body.username,
          email: res.body.email
        }
        localStorage.setItem(USER_PROFILE, JSON.stringify(userInfo));
        this.user = userInfo;
        this.activeModal.close();
        this.toastrService.success('Đăng nhập thành công', 'Thông báo');
        this.route.navigate(['/home']);
      }
    }, error => {
      this.toastrService.error('username or password error');
    });
  }
}
