import { Component, OnInit } from '@angular/core';
import { RazaService } from 'src/app/services/raza.service';

@Component({
  selector: 'app-explorar-razas',
  templateUrl: './explorar-razas.page.html',
  styleUrls: ['./explorar-razas.page.scss'],
  standalone: false
})
export class ExplorarRazasPage implements OnInit {
  tipoAnimal: string = 'gato';
  razas: any[] = [];
  razaSeleccionada: any = null;
  imagen: string = '';
  descripcion: string = '';

  constructor(private razaService: RazaService) {}

  ngOnInit() {
    this.cargarRazas();
  }

  cargarRazas() {
    this.razas = [];
    this.razaSeleccionada = null;
    this.imagen = '';
    this.descripcion = '';

    if (this.tipoAnimal === 'gato') {
      this.razaService.getRazasGato().subscribe(data => {
        this.razas = data;
      });
    } else {
      this.razaService.getRazasPerro().subscribe(data => {
        this.razas = data;
      });
    }
  }

  async mostrarRaza(event: any) {
    const id = event.detail.value;

    if (this.tipoAnimal === 'gato') {
      this.razaSeleccionada = this.razas.find(r => r.id === id);
      this.descripcion = this.razaSeleccionada?.temperament || 'Sin descripción.';

      this.razaService.getImagenGato(id).subscribe(data => {
        this.imagen = data[0]?.url || 'assets/default-raza.jpg';
      });
    } else {
      this.razaSeleccionada = this.razas[parseInt(id, 10)];
      this.descripcion = this.razaSeleccionada?.temperament || 'Sin descripción.';

      if (this.razaSeleccionada?.image?.url) {
        this.imagen = this.razaSeleccionada.image.url;
      } else {
        this.razaService.getImagenPerro(this.razaSeleccionada.id).subscribe(data => {
          this.imagen = data[0]?.url || 'assets/default-raza.jpg';
        });
      }
    }
  }
}
