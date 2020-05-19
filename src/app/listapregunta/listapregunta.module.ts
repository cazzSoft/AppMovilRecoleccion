import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapreguntaPageRoutingModule } from './listapregunta-routing.module';

import { ListapreguntaPage } from './listapregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListapreguntaPageRoutingModule
  ],
  declarations: [ListapreguntaPage]
})
export class ListapreguntaPageModule {}
