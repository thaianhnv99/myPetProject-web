import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InputNumberDirective} from './directive/input-number.directive';
import {IvyCarouselModule} from "./component/carousel/carousel.module";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    IvyCarouselModule
  ],
  declarations: [
    InputNumberDirective
  ],
  exports: [
    InputNumberDirective,
    ToastrModule
  ]
})
export class SharedModule {
}
