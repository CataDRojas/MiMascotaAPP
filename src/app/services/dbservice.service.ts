import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private toastController: ToastController
  ) {
    this.initDataBase();
  }

  getDatabaseState() {
    return this.isDBReady.asObservable();
  }

  private async initDataBase() {
    try {
      this.db = await this.sqlite.create({
        name: 'mimascotadb.db',
        location: 'default'
      });

      await this.createTables();
      this.isDBReady.next(true);
      this.presentToast('¡Bienvenido!');
    } catch (error) {
      console.error('Error al iniciar la base de datos:', error);
    }
  }

  private async createTables() {
    try {
      await this.db.executeSql(
        // Tabla usuarios
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombres TEXT NOT NULL,
          apellidoPat TEXT NOT NULL,
          apellidoMat TEXT NOT NULL,
          correo TEXT NOT NULL UNIQUE,
          contrasena TEXT NOT NULL,
          telefono TEXT NOT NULL
        )`,
        []
      );

      // Tabla mascotas
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS mascotas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          foto TEXT,
          fechaNacimiento TEXT,
          especie TEXT NOT NULL,
          colores TEXT NOT NULL,
          sexo TEXT NOT NULL,
          chip TEXT,
          correo_usuario TEXT NOT NULL,
          FOREIGN KEY (correo_usuario) REFERENCES usuarios(correo)
        )`,
        []
      );
    } catch (error) {
      console.error('Error al crear tablas:', error);
    }
  }

  async registrarUsuario(usuario: any): Promise<boolean> {
    try {
      const result = await this.db.executeSql(
        `SELECT * FROM usuarios WHERE correo = ?`,
        [usuario.correo]
      );

      if (result.rows.length > 0) {
        return false;
      }

      await this.db.executeSql(
        `INSERT INTO usuarios (nombres, apellidoPat, apellidoMat, correo, contrasena, telefono)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          usuario.nombres,
          usuario.apellidoPat,
          usuario.apellidoMat,
          usuario.correo,
          usuario.contrasena,
          usuario.telefono
        ]
      );

      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async registrarMascota(mascota: any): Promise<boolean> {
    try {
      await this.db.executeSql(
        `INSERT INTO mascotas (nombre, foto, fechaNacimiento, especie, colores, sexo, chip, correo_usuario)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          mascota.nombre,
          mascota.foto,
          mascota.fechaNacimiento,
          mascota.especie,
          mascota.colores,
          mascota.sexo,
          mascota.chip,
          mascota.correo_usuario
        ]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      return false;
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async obtenerMascotasPorUsuario(correo: string): Promise<any[]> {
    try {
      const res = await this.db.executeSql('SELECT * FROM mascotas WHERE correo_usuario = ?', [correo]);
      let mascotas: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        mascotas.push(res.rows.item(i));
      }
      return mascotas;
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      return [];
    }
  }

  async obtenerMascotaPorId(id: number, correo: string): Promise<any | null> {
    try {
      const res = await this.db.executeSql(
        'SELECT * FROM mascotas WHERE id = ? AND correo_usuario = ?',
        [id, correo]
      );

      if (res.rows.length > 0) {
        return res.rows.item(0);
      }

      return null;
    } catch (error) {
      console.error('Error al obtener mascota por ID:', error);
      return null;
    }
  }

  async borrarMascotaPorId(id: number): Promise<void> {
    try {
      await this.db.executeSql('DELETE FROM mascotas WHERE id = ?', [id]);
      console.log('Mascota eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
    }
  }

  async validarCredenciales(correo: string, contrasena: string): Promise<any | null> {
    try {
      const res = await this.db.executeSql(
        `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`,
        [correo, contrasena]
      );

      if (res.rows.length > 0) {
        return res.rows.item(0);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al validar credenciales:', error);
      return null;
    }
  }

  async actualizarMascota(id: number, mascota: any): Promise<void> {
    try {
      await this.db.executeSql(
        `UPDATE mascotas SET nombre = ?, foto = ?, fechaNacimiento = ?, especie = ?, colores = ?, sexo = ?, chip = ? WHERE id = ?`,
        [
          mascota.nombre,
          mascota.foto,
          mascota.fechaNacimiento,
          mascota.especie,
          mascota.colores,
          mascota.sexo,
          mascota.chip,
          id
        ]
      );
      console.log('Mascota actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
    }
  }




}
