import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-ficha-mascota',
  templateUrl: './ficha-mascota.page.html',
  styleUrls: ['./ficha-mascota.page.scss'],
  standalone: false,
})
export class FichaMascotaPage {
  mascota: any = null;
  correo: string = '';
  idMascota: number = 0;

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dbService: DbserviceService
  ) {}

  ionViewWillEnter() {
    this.cargarFicha();
  }

  async cargarFicha() {
    this.idMascota = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.idMascota);

    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) {
      console.error('No hay usuario logueado');
      return;
    }

    this.correo = JSON.parse(usuario).correo;

    const mascotas = await this.dbService.obtenerMascotasPorUsuario(this.correo);
    console.log('Mascotas actualizadas:', mascotas);

    this.mascota = mascotas.find(m => Number(m.id) === this.idMascota);

    if (!this.mascota) {
      console.warn('Mascota no encontrada con ID:', this.idMascota);
    }
  }

  borrarMascota() {
    this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: `Vas a eliminar a ${this.mascota.nombre}. Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.dbService.borrarMascotaPorId(this.mascota.id);
            this.navCtrl.navigateRoot('/home');
          },
          cssClass: 'danger'
        }
      ]
    }).then(alerta => alerta.present());
  }

  editarMascota() {
    this.navCtrl.navigateForward(`/editar-mascota/${this.idMascota}`);
  }
}
