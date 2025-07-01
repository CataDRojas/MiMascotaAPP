import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.page.html',
  styleUrls: ['./registrar-mascota.page.scss'],
  standalone: false,
})
export class RegistrarMascotaPage {
  mascota = {
    nombre: '',
    foto: '',
    fechaNacimiento: '',
    especie: '',
    colores: '',
    sexo: '',
    chip: ''
  };

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private dbService: DbserviceService) { }

  async seleccionarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      if (imagen && imagen.dataUrl) {
        const redimensionada = await this.redimensionarImagen(imagen.dataUrl, 600, 600);
        this.mascota.foto = redimensionada;
      }
    } catch (error) {
      console.error('Error al obtener foto:', error);
      this.mostrarAlerta('No se pudo obtener la foto.');
    }
  }
  redimensionarImagen(dataUrl: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve(resizedDataUrl);
      };
      img.src = dataUrl;
    });
  }

  async guardarMascota(form: any) {
    if (!form.valid || !this.mascota.fechaNacimiento) {
      console.log('Formulario inválido');
      return;
    }

    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) {
      return this.mostrarAlerta('No se pudo obtener el usuario logueado.');
    }

    const correo = JSON.parse(usuario).correo;

    const nuevaMascota = {
      nombre: this.mascota.nombre,
      foto: this.mascota.foto,
      fechaNacimiento: this.mascota.fechaNacimiento,
      especie: this.mascota.especie,
      colores: this.mascota.colores,
      sexo: this.mascota.sexo,
      chip: this.mascota.chip,
      correo_usuario: correo
    };

    const exito = await this.dbService.registrarMascota(nuevaMascota);

    if (exito) {
      this.navCtrl.navigateBack('/home');
    } else {
      this.mostrarAlerta('No se pudo guardar la mascota en la base de datos.');
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