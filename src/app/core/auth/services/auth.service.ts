import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment as env} from '../../../../environments/environment';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    this.clearToken();
    let data = {
      'username': username,
      'password': password
    };

    return this.http
      .post<any>(env.authenticationUrl, data, {observe: 'response'});
  }

  private clearToken() {

  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
  *
  * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
