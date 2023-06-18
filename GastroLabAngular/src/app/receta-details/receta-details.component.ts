import { Opinion } from './../interfaces/opinion.interface';
import { Usuario } from './../interfaces/usuario.interface';
import { Ingrediente } from './../interfaces/ingrediente.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiservice } from '../apiservice.service';
import { Receta } from '../interfaces/receta.interface';
import { Router } from '@angular/router';
import { Valoracion } from '../interfaces/valoracion.interface';

@Component({
  selector: 'app-receta-details',
  templateUrl: './receta-details.component.html',
  styleUrls: ['./receta-details.component.css']
})
export class RecetaDetailsComponent implements OnInit {
  mostrarPestanaCreacion = false;
  receta!: Receta;
  ingredientes: Ingrediente[] = [];
  opiniones: Opinion[] = [];
  valoracion: number = 0;
  usuario!:Usuario;
  constructor(
    private route: ActivatedRoute,
    private apiservice: apiservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.usuario = JSON.parse(loggedInUser);
    } else {
      // Si no hay usuario logeado, redirigir al componente de login
      this.router.navigate(['/login']);
    }
    const recetaId = Number(this.route.snapshot.paramMap.get('id'));
    if (recetaId) {
      this.obtenerReceta(recetaId);
    }
  }

  obtenerReceta(id: number): void {
    this.apiservice.obtenerReceta(id).subscribe(
      (receta: Receta) => {
        this.receta = receta;
        this.apiservice.obtenerIngredientesReceta(this.receta.id).subscribe(
          (ingredientes: Ingrediente[]) => {
            this.ingredientes = ingredientes;
          }
        );
        this.apiservice.obtenerOpinionesReceta(this.receta.id).subscribe(
          (opiniones: Opinion[]) => {
            this.opiniones = opiniones;
            this.asignarNombreUsuarioOpiniones();
          }
        );

      },
      (error: any) => {
        console.error('Error al obtener la receta:', error);
      }
    );
  }

  asignarNombreUsuarioOpiniones(): void {
    this.opiniones.forEach(opinion => {
      this.apiservice.obtenerUsuarioOpinion(opinion.id).subscribe(
        (usuario: Usuario) => {
          opinion.nombreUsuario = usuario.nombre;
        },
        (error: any) => {
          console.error('Error al obtener el usuario de la opinión:', error);
        }
      );
    });
  }

  crearOpinion(form:any):void{
    if (form.valid) {
      const nuevaOpinion: any = {
        titulo: form.value.titulo,
        mensaje: form.value.mensaje,
        usuarioId: this.usuario?.id || 0,
        recetaId: this.receta.id
      };
      this.apiservice.crearOpinion(nuevaOpinion).subscribe();
      this.obtenerReceta(this.receta.id);
    }
  }

  crearValoracion(valoracion:number):void{
    if (valoracion) {
      const nuevaValoracion: any = {
        valor:valoracion,
        usuarioId: this.usuario?.id || 0,
        recetaId: this.receta.id
      };
      this.apiservice.crearValoracion(nuevaValoracion).subscribe();
      this.obtenerReceta(this.receta.id);
    }
  }
  abrirPestanaCreacion(): void {
    this.mostrarPestanaCreacion = true;
  }

  cerrarPestanaCreacion(): void {
    this.mostrarPestanaCreacion = false;
  }

  valorar(valor: number): void {
    this.valoracion = valor;
  }

}
