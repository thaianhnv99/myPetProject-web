import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormCheckOutComponent} from './views/pages/form-check-out/form-check-out.component';
import {ContentComponent} from "./views/theme/content/content.component";
import {AboutComponent} from "./views/pages/about/about.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: ContentComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule),
  },
  // {
  //   path: 'petguide',
  //   component: PetGuiDeComponent,
  // },

  {
    path: 'checkout',
    component: FormCheckOutComponent,
  },
];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
