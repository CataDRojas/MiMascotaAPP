import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarMascotaPageRoutingModule } from './registrar-mascota-routing.module';

import { RegistrarMascotaPage } from './registrar-mascota.page';
import { ComponentesModule } from 'src/app/componentes/menu-lateral/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarMascotaPageRoutingModule,
    ComponentesModule
  ],
  declarations: [RegistrarMascotaPage]
})
export class RegistrarMascotaPageModule {}
