import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './interfaces/usuario.interface';
import { Receta } from './interfaces/receta.interface';
import { Ingrediente } from './interfaces/ingrediente.interface';
import { Opinion } from './interfaces/opinion.interface';
@Injectable({
  providedIn: 'root'
})
export class apiservice {
  private apiUrl = 'https://localhost:7271/api';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/Usuario`);
  }

  obtenerUsuario(UsuarioId:number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/Usuario/${UsuarioId}`);
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/Usuario`, usuario);
  }

  obtenerRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/Receta`);
  }

  obtenerReceta(id:number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/Receta/${id}`);
  }

  obtenerIngrediente(id:number): Observable<Ingrediente> {
    return this.http.get<Ingrediente>(`${this.apiUrl}/Ingrediente/${id}`);
  }

  obtenerIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/Ingrediente`);
  }

  obtenerIngredientesReceta(RecetaId:number): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/Receta/Ingredientes/${RecetaId}`);
  }

  obtenerOpinionesReceta(RecetaId:number): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${this.apiUrl}/Receta/Opiniones/${RecetaId}`);
  }

  crearIngrediente(ingrediente: Ingrediente): Observable<any> {
    return this.http.post(`${this.apiUrl}/Ingrediente`, ingrediente);
  }

  crearReceta(receta: Receta): Observable<any> {
    const url = `${this.apiUrl}/Receta`;

    const params = {
      UsuarioId: receta.usuarioId.toString(),
      IngredienteId: receta.ingredientesreceta.map(id => id.toString()),
    };

    const body = {
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      tipo: receta.tipo,
      url: receta.url
    };

    return this.http.post(url, body, { params });
  }


}
