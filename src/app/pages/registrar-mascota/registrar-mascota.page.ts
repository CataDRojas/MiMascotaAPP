import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.page.html',
  styleUrls: ['./registrar-mascota.page.scss'],
  standalone: false,
})
export class RegistrarMascotaPage {
  mascota = {
    nombre: '',
    foto: 'assets/img-mascota/gato.jpg', //imagen por defecto, se cambia cuando se selecciona la especie
    fechaNacimiento: '',
    especie: 'Gato',
    colores: '',
    sexo: '',
    chip: ''
  };

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  actualizarFotoPorEspecie() {
    if (!this.mascota.foto || this.mascota.foto.startsWith('assets/')) {
      this.mascota.foto = this.imagenPorDefecto();
    }
  }

  imagenPorDefecto(): string {
    return this.mascota.especie === 'Perro'
      ? 'assets/img-mascota/perro.jpg'
      : 'assets/img-mascota/gato.jpg';
  }

  async guardarMascota(form: any) {
    if (!form.valid || !this.mascota.fechaNacimiento) {
      console.log('Formulario inválido');
      return;
    }

    const correo = localStorage.getItem('usuario_logueado');
    if (!correo) {
      return this.mostrarAlerta('No se pudo obtener el usuario logueado.');
    }

    const claveMascotas = `mascotas_${correo}`;
    const mascotas = JSON.parse(localStorage.getItem(claveMascotas) || '[]');

    const nuevaMascota = {
      ...this.mascota,
      id: Date.now()
    };

    mascotas.push(nuevaMascota);

    try {
      localStorage.setItem(claveMascotas, JSON.stringify(mascotas));
      console.log('Mascotas guardadas para', correo, ':', mascotas);
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
      this.mostrarAlerta('No se pudo guardar la mascota.');
    }
  }

  guardarFechaNacimiento(event: any) {
    this.mascota.fechaNacimiento = event.detail.value;
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}