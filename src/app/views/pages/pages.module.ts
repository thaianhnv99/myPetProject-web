import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetDetailComponent} from './pet-detail/pet-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../core/common/shared.module";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule} from "ngx-spinner";
import {PetsComponent} from './pets/pets.component';
import {PetPostComponent} from './pet-post/pet-post.component';
import { PetFormAdoptComponent } from './pet-form-adopt/pet-form-adopt.component';


@NgModule({
  declarations: [PetDetailComponent, PetsComponent, PetPostComponent, PetFormAdoptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'pets',
        pathMatch: 'full',
      },
      {
        path: 'pets',
        component: PetsComponent
      },
      {
        path: 'pets-detail',
        component: PetDetailComponent
      },
      {
        path: 'pets-post',
        component: PetPostComponent
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class PagesModule {
}
