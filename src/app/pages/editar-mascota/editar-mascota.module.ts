import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMascotaPageRoutingModule } from './editar-mascota-routing.module';
import { ComponentesModule } from 'src/app/componentes/menu-lateral/componentes.module';

import { EditarMascotaPage } from './editar-mascota.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMascotaPageRoutingModule,
    ComponentesModule
  ],
  declarations: [EditarMascotaPage]
})
export class EditarMascotaPageModule {}
