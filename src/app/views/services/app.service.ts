import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  API_URL = ``;
  itemCart: Cart[] = [{
    id: '1',
    name: 'abc',
    price: '30000',
    quantity: 2,
  },
    {
      id: '2',
      name: 'abc',
      price: '30000',
      quantity: 1,
    },
  ];

  constructor(private http: HttpClient) {
  }

  addToCart(item: any) {
    if (!this.itemCart.some(i => i.id === item.id)) {
      this.itemCart.push(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        });
    } else {
      this.itemCart.forEach(i => {
        if (i.id === item.id) {
          i.quantity = this.toNumber(item.quantity + 1);
        }
      });
    }
  }

  clearItemCart(){
    this.itemCart = [];
  }

  removeItemCart(id: any){
    this.itemCart = this.itemCart.filter(item => item.id !== id);
  }

  getItemFormCart(): Cart[] {
    return this.itemCart;
  }

  getTotalCount() {
    let count = 0;
    if (this.itemCart.length) {
      this.itemCart.forEach(item => {
        count += this.toNumber(item.quantity);
      });
    }
    return count;
  }

  getTotalPrice() {
    let total = 0;
    if (this.itemCart.length) {
      this.itemCart.forEach(item => {
        total += this.toNumber(Number(item.quantity) * Number(item.price));
      });
    }
    return total;
  }

  private toNumber(value: any) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
  }
}
