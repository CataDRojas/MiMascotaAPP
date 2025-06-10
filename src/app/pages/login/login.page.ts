import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Usuario {
  correo: string;
  contrasena: string;
}

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
  private alertController: AlertController
) {}

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

    const usuariosGuardadosJSON = localStorage.getItem('usuarios');
    const usuariosGuardados: Usuario[] = usuariosGuardadosJSON ? JSON.parse(usuariosGuardadosJSON) : [];

    const usuarioEncontrado = usuariosGuardados.find(
      u => u.correo === this.correo
    );

    if (!usuarioEncontrado) {
      await this.presentAlert('El correo no está registrado. Por favor, regístrate primero.');
      return;
    }

    if (usuarioEncontrado.contrasena !== this.contrasena) {
      await this.presentAlert('Contraseña incorrecta. Intenta nuevamente.');
      return;
    }

    localStorage.setItem('usuario_logueado', this.correo);
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/home'], {
      queryParams: { user: this.correo }
    });
  }

  registroUsuario() {
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