import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  mascotas: any[] = [];

  constructor(private navCtrl: NavController, private router: Router) { }

  ionViewWillEnter() {
    this.cargarMascotas();
  }

  cargarMascotas() {
    const correo = localStorage.getItem('usuario_logueado');

    if (correo) {
      const data = localStorage.getItem(`mascotas_${correo}`);
      this.mascotas = data ? JSON.parse(data) : [];
    } else {
      this.mascotas = [];
    }
  }

  verFichaMascota(mascota: any) {
    this.router.navigate([`/ficha-mascota/${mascota.id}`]);
  }
}
