import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  API_URL = `${environment.ApiUrl}mapi/petController/`;
  itemPet: any = null;

  constructor(
    private http: HttpClient,
  ) {
  }

  setItemPet(data: any) {
    this.itemPet = data;
  }

  getItemPet() {
    return this.itemPet;
  }

  getAllPet(data: any): Observable<any> {
    return this.http.post(this.API_URL + `getDatatablePet`, data, {observe: 'response'});
  }
}
