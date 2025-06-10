import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuLateralComponent } from './menu-lateral.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuLateralComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [MenuLateralComponent] // ← permite usarlo en otros módulos
})
export class ComponentesModule {}
