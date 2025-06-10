import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaMascotaPageRoutingModule } from './ficha-mascota-routing.module';

import { FichaMascotaPage } from './ficha-mascota.page';
import { FormatearFechaPipe } from 'src/app/pipes/formatear-fecha.pipe';
import { ComponentesModule } from 'src/app/componentes/menu-lateral/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaMascotaPageRoutingModule,
    ComponentesModule
  ],
  declarations: [FichaMascotaPage, FormatearFechaPipe]
})
export class FichaMascotaPageModule {}
