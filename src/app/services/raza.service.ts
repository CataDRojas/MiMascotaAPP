import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazaService {
  constructor(private http: HttpClient) {}

  getRazasGato() {
    return this.http.get<any[]>('https://api.thecatapi.com/v1/breeds');
  }

  getRazasPerro() {
    return this.http.get<any[]>('https://api.thedogapi.com/v1/breeds');
  }

  getImagenGato(idRaza: string) {
    return this.http.get<any[]>(`https://api.thecatapi.com/v1/images/search?breed_ids=${idRaza}`);
  }

  getImagenPerro(idRaza: number) {
    return this.http.get<any[]>(`https://api.thedogapi.com/v1/images/search?breed_ids=${idRaza}`);
  }
}
