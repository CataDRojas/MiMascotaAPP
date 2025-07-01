import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorarRazasPage } from './explorar-razas.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorarRazasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorarRazasPageRoutingModule {}
