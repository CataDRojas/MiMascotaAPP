import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { DbserviceService } from 'src/app/services/dbservice.service';
//import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    //private dbService: DbserviceService
  ) { }

  isEmailInvalid(): boolean {
    return (
      !this.correo ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)
    );
  }

  isPasswordInvalid(): boolean {
    return !this.contrasena || !/^\d{6}$/.test(this.contrasena);
  }


  async login(form: any) {
    if (this.isEmailInvalid() || this.isPasswordInvalid()) {
      await this.presentAlert('¡Ups! Debes ingresar datos válidos.');
      return;
    }

    // const dbReady = await firstValueFrom(this.dbService.getDatabaseState());
    // if (!dbReady) {
    //   await this.presentAlert('La base de datos no está lista. Intenta en unos segundos.');
    //   return;
    // }

    // const usuarioEncontrado = await this.dbService.validarCredenciales(
    //   this.correo.trim(),
    //   this.contrasena.trim()
    // );

    // if (!usuarioEncontrado) {
    //   await this.presentAlert('Correo o contraseña incorrectos.');
    //   return;
    // }

    //localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
    localStorage.setItem('usuarioActual', JSON.stringify({ correo: this.correo }));
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/home']);
  }

  registroUsuario() {
    console.log('click en registrarse');
    this.router.navigate(['/registro-usuario']);
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Ocurrió un error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}