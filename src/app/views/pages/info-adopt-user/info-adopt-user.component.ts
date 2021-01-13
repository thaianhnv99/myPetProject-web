import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {USER_PROFILE} from "../../../core/utils/constant";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";
import {OrdersService} from "../../theme/service/orders.service";
import {PageConfig} from "../../../core/common/pagination.config";

@Component({
  selector: 'app-info-adopt-user',
  templateUrl: './info-adopt-user.component.html',
  styleUrls: ['./info-adopt-user.component.css']
})
export class InfoAdoptUserComponent implements OnInit {
  listPet: any[] = [];
  searchOption: any = {
    page: 0,
    pageSize: 50,
  };
  pageOptions = new PageConfig();
  page: number = 0;

  constructor(
    private spinnerService: NgxSpinnerService,
    private ordersService: OrdersService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.buildPage(1);
    this.fetch();
  }

  onSearch(pageNumber: any) {
    this.page = pageNumber;
    this.buildPage(pageNumber);
    this.fetch();
  }

  buildPage(pageNumber?: any) {
    this.searchOption.pageSize = this.pageOptions.pageSize;
    this.searchOption.page = pageNumber;
    this.pageOptions.pageNumber = pageNumber;
  }

  fetch() {
    let userInfo: any = JSON.parse(localStorage.getItem(USER_PROFILE));
    if (userInfo) {
      this.searchOption['userId'] = userInfo.id;
      this.spinnerService.show();
      this.ordersService.getListOrderByUserId(this.searchOption).pipe(finalize(() => {
        this.spinnerService.hide();
      })).subscribe(res => {
        console.log(res);
        if (res.body.data.length) {
          this.listPet = res.body.data
        }
      })
    } else {
      this.route.navigate(['/home'])
    }
  }

  removeItem(item: any) {
    this.spinnerService.show();
    this.ordersService.deleteOrderById(item.orderId).pipe(finalize(() => {
      this.spinnerService.hide();
    })).subscribe(res => {
      this.fetch();
    })
  }

}
