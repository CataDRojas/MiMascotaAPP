import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Verifica si hay un usuario activo en localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioActual');
  }

  // Retorna el usuario actual
  getUsuarioActual() {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Para cerrar sesión
  logout() {
    localStorage.removeItem('usuarioActual');
  }
}
