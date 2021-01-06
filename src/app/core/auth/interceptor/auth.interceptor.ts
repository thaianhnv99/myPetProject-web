import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment, environment as env} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public modal: NgbModal,
    public spinnerService: NgxSpinnerService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url) {
      return next.handle(request);
    }

    if (request.url === (env.authenticationUrl)) {
      request = request.clone({
        setHeaders: {
          'X-IBM-Client-Secret': 'sL6bF1nM0jE8eR3aF0dP4hX5iE1aG8mB4xW3uK1vB0yD4fA0kN',
          'X-IBM-Client-Id': '9deabb42-173c-44bb-bc00-3b0e2bdd3546'
        }
      });
      return next.handle(request);
    }

    return this.addAuthorization(request, next);
  }

  private addAuthorization(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.authTokenKey);
    console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    else {
      // this.toastrService.error('Hết phiên đăng nhập', 'Thông báo');
      // this.modal.dismissAll();
      // this.spinnerService.hide();
      // this.router.navigateByUrl('/login');
      // throwError('Hết phiên đăng nhập');
    }

    return next.handle(request);
  }

}

// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return next.handle(request).pipe(
//     tap(null, (err: HttpErrorResponse) => {
//       if (err.status === 401 && err.url && !err.url.includes('api/account-info')) {
//         this.loginService.logout();
//       }
//     })
//   );
// }
