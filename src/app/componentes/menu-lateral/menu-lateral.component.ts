import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: false,
})
export class MenuLateralComponent {
  mostrarMenu = true;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rutasSinMenu = ['/login', '/registro-usuario', '/bienvenida'];
        this.mostrarMenu = !rutasSinMenu.includes(event.urlAfterRedirects);
      }
    });
  }

  async cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    const alert = await this.alertController.create({
      header: '¡Adiós!',
      message: 'Has cerrado sesión correctamente.',
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
    this.navCtrl.navigateRoot('/login');
  }

  cerrarMenu() {
  this.menuCtrl.close();
}

}
