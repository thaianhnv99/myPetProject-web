import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Cart} from '../../model/cart';

@Component({
  selector: 'app-form-check-out',
  templateUrl: './form-check-out.component.html',
  styleUrls: ['./form-check-out.component.css']
})
export class FormCheckOutComponent implements OnInit {
  itemCart: Cart[] = [];

  constructor(
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.getItemCart();
  }

  getItemCart() {
    this.itemCart = this.appService.getItemFormCart();
  }

  clearCart() {
    this.appService.clearItemCart();
    this.getItemCart();
  }

  removeItem(item: any){
    this.appService.removeItemCart(item.id);
    this.getItemCart();
  }
}
