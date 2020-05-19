import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapreguntaPage } from './listapregunta.page';

const routes: Routes = [
  {
    path: '',
    component: ListapreguntaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapreguntaPageRoutingModule {}
