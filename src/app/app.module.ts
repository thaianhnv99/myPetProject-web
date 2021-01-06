import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./core/common/shared.module";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {HeaderComponent} from './views/theme/header/header.component';
import {FooterComponent} from './views/theme/footer/footer.component';
import {ContentComponent} from './views/theme/content/content.component';
import { AsideComponent } from './views/theme/aside/aside.component';
import { AboutComponent } from './views/pages/about/about.component';
import {IvyCarouselModule} from "./core/common/component/carousel/carousel.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AsideComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      preventDuplicates: true
    }),
    IvyCarouselModule,
  ],
  providers: [
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
