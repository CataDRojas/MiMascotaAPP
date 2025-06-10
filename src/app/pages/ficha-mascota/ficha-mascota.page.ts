import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ficha-mascota',
  templateUrl: './ficha-mascota.page.html',
  styleUrls: ['./ficha-mascota.page.scss'],
  standalone: false,
})
export class FichaMascotaPage implements OnInit {
  mascota: any = null;
  correo: string = '';

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.correo = localStorage.getItem('usuario_logueado') || '';

    if (!this.correo) {
      console.error('No hay usuario logueado');
      return;
    }

    const data = localStorage.getItem(`mascotas_${this.correo}`);
    const lista = data ? JSON.parse(data) : [];

    this.mascota = lista.find((m: any) => m.id === id);

    if (!this.mascota) {
      console.warn('Mascota no encontrada con id:', id);
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
          handler: () => {
            const mascotasGuardadas = JSON.parse(localStorage.getItem(`mascotas_${this.correo}`) || '[]');
            const actualizadas = mascotasGuardadas.filter((m: any) => m.id !== this.mascota.id);

            localStorage.setItem(`mascotas_${this.correo}`, JSON.stringify(actualizadas));
            this.navCtrl.navigateRoot('/home');
          },
          cssClass: 'danger'
        }
      ]
    }).then(alerta => alerta.present());
  }
}
