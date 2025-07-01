import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.page.html',
  styleUrls: ['./editar-mascota.page.scss'],
  standalone: false
})
export class EditarMascotaPage implements OnInit {
  mascota: any = {
    nombre: '',
    fechaNacimiento: '',
    especie: '',
    colores: '',
    sexo: '',
    chip: '',
    foto: ''
  };
  id: number = 0;
  correo: string = '';

  constructor(
    private route: ActivatedRoute,
    private dbService: DbserviceService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) return;

    this.correo = JSON.parse(usuario).correo;
    const mascotaDB = await this.dbService.obtenerMascotaPorId(this.id, this.correo);

    if (mascotaDB) {
      this.mascota = mascotaDB;
    } else {
      console.error('Mascota no encontrada');
    }
  }

  async guardarCambios() {
    try {
      await this.dbService.actualizarMascota(this.id, this.mascota);
      const alert = await this.alertCtrl.create({
        header: 'Mascota actualizada',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/ficha-mascota', this.id]);
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
    }
  }
}
