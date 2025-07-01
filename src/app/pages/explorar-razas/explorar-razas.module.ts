import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorarRazasPageRoutingModule } from './explorar-razas-routing.module';

import { ExplorarRazasPage } from './explorar-razas.page';
import { ComponentesModule } from 'src/app/componentes/menu-lateral/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorarRazasPageRoutingModule,
    ComponentesModule
  ],
  declarations: [ExplorarRazasPage]
})
export class ExplorarRazasPageModule {}
