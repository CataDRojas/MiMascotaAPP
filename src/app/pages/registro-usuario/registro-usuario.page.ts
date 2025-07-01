import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
  standalone: false,
})
export class RegistroUsuarioPage {
  nombres: string = '';
  apellidoPat: string = '';
  apellidoMat: string = '';
  correo: string = '';
  contrasena: string = '';
  confContrasena: string = '';
  telefono: string = '';

  animarNombre: boolean = false;
  animarApellido: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DbserviceService
  ) {}

  limpiarCampos() {
    this.nombres = '';
    this.apellidoPat = '';
    this.apellidoMat = '';
    this.correo = '';
    this.contrasena = '';
    this.confContrasena = '';
    this.telefono = '';
    this.animarNombre = true;
    this.animarApellido = true;

    setTimeout(() => {
      this.animarNombre = false;
      this.animarApellido = false;
    }, 1000);
  }

  // VALIDACIONES
  isNombreInvalid(): boolean {
    return !this.nombres || !/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(this.nombres);
  }

  isApellidoPatInvalid(): boolean {
    return !this.apellidoPat || !/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(this.apellidoPat);
  }

  isApellidoMatInvalid(): boolean {
    return !this.apellidoMat || !/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(this.apellidoMat);
  }

  isEmailInvalid(): boolean {
    return (
      !this.correo ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)
    );
  }

  isPasswordInvalid(): boolean {
    return !this.contrasena || !/^\d{6}$/.test(this.contrasena);
  }

  isConfPasswordInvalid(): boolean {
    return !this.confContrasena || this.confContrasena !== this.contrasena;
  }

  isTelefonoInvalid(): boolean {
    return !this.telefono || !/^\+56\d{9}$/.test(this.telefono);
  }

  // REGISTRO
  async registrar(form: any) {
    if (
      this.isNombreInvalid() ||
      this.isApellidoPatInvalid() ||
      this.isApellidoMatInvalid() ||
      this.isEmailInvalid() ||
      this.isPasswordInvalid() ||
      this.isConfPasswordInvalid() ||
      this.isTelefonoInvalid()
    ) {
      await this.presentAlert('Asegúrate de que todos los campos sean válidos.');
      return;
    }

    const exito = await this.dbService.registrarUsuario({
      nombres: this.nombres,
      apellidoPat: this.apellidoPat,
      apellidoMat: this.apellidoMat,
      correo: this.correo,
      contrasena: this.contrasena,
      telefono: this.telefono
    });

    if (!exito) {
      await this.presentAlert('Este correo ya está registrado o ocurrió un error.');
      return;
    }

    // Guardar sesión 
    localStorage.setItem('usuarioActual', JSON.stringify({ correo: this.correo }));

    const alert = await this.alertController.create({
      header: '¡Registro exitoso!',
      message: 'Tu cuenta ha sido creada correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Revisa los datos ingresados',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
