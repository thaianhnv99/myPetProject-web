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
import {AsideComponent} from './views/theme/aside/aside.component';
import {AboutComponent} from './views/pages/about/about.component';
import {IvyCarouselModule} from "./core/common/component/carousel/carousel.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PagesModule} from "./views/pages/pages.module";
import {CoreModule} from "./core/core.module";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
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
    PagesModule,
  ],
  providers: [
    NgxSpinnerService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
