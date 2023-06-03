import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class apiservice {
  constructor(private http: HttpClient) {}

  obtenerDatosDeRecetas() {
    return this.http.get('https://localhost:7271/api/Receta');
  }
}
