import {Component, OnInit} from '@angular/core';
import {USER_PROFILE} from "../../../core/utils/constant";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "../../pages/login/login.component";
import {ToastrService} from "ngx-toastr";
import {PetsService} from "../service/pets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.toastrService.success('Đăng xuất thành công', 'Thông báo');
    this.router.navigate(['/home'])
  }

  login() {
    const modalRef = this.modal.open(LoginComponent, {size: 'lg', windowClass: 'modal-login-top'});
    modalRef.result.then(result => {
    });
  }

  checkUser(): boolean {
    let user = localStorage.getItem(USER_PROFILE);
    if (user) {
      return true;
    }
    return false;
  }
}
