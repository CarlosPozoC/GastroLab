import { Usuario } from './../interfaces/usuario.interface';
import { Ingrediente } from './../interfaces/ingrediente.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiservice } from '../apiservice.service';
import { Receta } from '../interfaces/receta.interface';
import { Opinion } from '../interfaces/opinion.interface';

@Component({
  selector: 'app-receta-details',
  templateUrl: './receta-details.component.html',
  styleUrls: ['./receta-details.component.css']
})
export class RecetaDetailsComponent implements OnInit {
  receta: Receta | undefined;
  ingredientes: Ingrediente[] = [];
  opiniones: Opinion[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiservice: apiservice
  ) {}

  ngOnInit(): void {
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
          }
        );
      },
      (error: any) => {
        console.error('Error al obtener la receta:', error);
      }
    );
  }
}
