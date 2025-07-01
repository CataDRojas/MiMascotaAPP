import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  mascotas: any[] = [];

  constructor(private router: Router, private dbService: DbserviceService) { }

  ionViewWillEnter() {
    this.cargarMascotas();
  }

  async cargarMascotas() {
    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) {
      this.mascotas = [];
      return;
    }
    const correo = JSON.parse(usuario).correo;
    try {
      this.mascotas = await this.dbService.obtenerMascotasPorUsuario(correo);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      this.mascotas = [];
    }
  }

  verFichaMascota(mascota: any) {
    this.router.navigate([`/ficha-mascota/${mascota.id}`]);
  }
}
