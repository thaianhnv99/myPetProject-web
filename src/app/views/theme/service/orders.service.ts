import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  API_URL = `${environment.ApiUrl}mapi/orderController`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getListOrderByUserId(data: any): Observable<any> {
    return this.http.post(this.API_URL + `/getListOrderByMemberId`, data, {observe: 'response'});
  }

  deleteOrderById(data: any): Observable<any> {
    return this.http.get(this.API_URL + `/delete?orderId=${data}`, {observe: 'response'});
  }

  insertOrder(data: any): Observable<any> {
    return this.http.post(this.API_URL + `/insert`, data, {observe: 'response'});
  }
}
