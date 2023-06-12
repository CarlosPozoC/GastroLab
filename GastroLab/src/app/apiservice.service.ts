import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './interfaces/usuario.interface';
import { Receta } from './interfaces/receta.interface';
import { Ingrediente } from './interfaces/ingrediente.interface';

@Injectable({
  providedIn: 'root'
})
export class apiservice {
  private apiUrl = 'https://localhost:7271/api';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/Usuario`);
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/Usuario`, usuario);
  }

  obtenerRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/Receta`);
  }

  obtenerIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/Ingrediente`);
  }

  crearIngrediente(ingrediente: Ingrediente): Observable<any> {
    return this.http.post(`${this.apiUrl}/Ingrediente`, ingrediente);
  }

  crearReceta(receta: Receta): Observable<any> {
    const url = `${this.apiUrl}/Receta`; // Reemplaza con la URL correcta de tu API

    const params = {
      UsuarioId: receta.usuarioId,
      IngredienteId: receta.ingredientes,
    };

    const body = receta;

    return this.http.post(url, body, { params });
  }

}
