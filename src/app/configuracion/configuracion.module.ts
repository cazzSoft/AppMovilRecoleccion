import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ConfiguracionPage } from './configuracion.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
    ModalInfoPageModule
    
  ],
  entryComponents:[ 
    ModalInfoPage   
  ], 
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
