import { Component, OnInit } from '@angular/core';
import { apiservice } from '../apiservice.service';
import { Receta } from '../interfaces/receta.interface';
import { Ingrediente } from '../interfaces/ingrediente.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  recetas: Receta[] = [];
  mostrarPestanaCreacion = false;
  usuario: Usuario | null = null;
  ingredientes: Ingrediente[] = [];

  constructor(private apiservice: apiservice, private router: Router) {}

  ngOnInit(): void {
    this.obtenerRecetas();
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.usuario = JSON.parse(loggedInUser);
    } else {
      // Si no hay usuario logeado, redirigir al componente de login
      this.router.navigate(['/login']);
    }
    this.obtenerIngredientes();
  }

  obtenerRecetas(): void {
    this.apiservice.obtenerRecetas().subscribe(
      (data: Receta[]) => {
        this.recetas = data;
      },
      (error: any) => {
        console.error('Error al obtener las recetas:', error);
      }
    );
  }

  obtenerIngredientes(): void {
    this.apiservice.obtenerIngredientes().subscribe(
      (data: Ingrediente[]) => {
        this.ingredientes = data;
      },
      (error: any) => {
        console.error('Error al obtener los ingredientes:', error);
      }
    );
  }

  abrirPestanaCreacion(): void {
    this.mostrarPestanaCreacion = true;
  }

  cerrarPestanaCreacion(): void {
    this.mostrarPestanaCreacion = false;
  }

  crearReceta(form: any): void {
    if (form.valid) {
      // Obtener los IDs de los ingredientes seleccionados
      const ingredientesSeleccionados = this.ingredientes.filter(ingrediente => form.value[ingrediente.id]);
      const ingredientesIds = ingredientesSeleccionados.map(ingrediente => ingrediente.id);

      const nuevaReceta: any = {
        nombre: form.value.nombre,
        descripcion: form.value.descripcion,
        tipo: form.value.tipo,
        usuarioId: this.usuario?.id || 0,
        ingredientes: ingredientesIds
      };

      this.apiservice.crearReceta(nuevaReceta).subscribe(
        (data: any) => {
          console.log('Receta creada exitosamente:', data);
          this.cerrarPestanaCreacion();
          this.obtenerRecetas();
          location.reload(); // Recargar la página para ver la nueva receta
        },
        (error: any) => {
          console.error('Error al crear la receta:', error);
        }
      );
    }
  }
}
