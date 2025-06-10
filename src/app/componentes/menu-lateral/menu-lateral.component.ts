import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: false,
})
export class MenuLateralComponent {

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  async cerrarSesion() {
    localStorage.removeItem('usuario_logueado');
    console.log('Sesión cerrada correctamente');

    const alert = await this.alertController.create({
      header: '¡Adiós!',
      message: 'Has cerrado sesión correctamente.',
      buttons: ['OK']
    });

    await alert.present();

    await alert.onDidDismiss();
    this.navCtrl.navigateRoot('/login');
  }

}
