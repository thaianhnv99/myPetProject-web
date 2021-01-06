// Anglar
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Layout Directives
// Services
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/interceptor/auth.interceptor';
import {AuthService} from './auth/services/auth.service';
import {SharedModule} from "./common/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [],
  exports: [],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
