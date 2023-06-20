import { Component, OnInit } from '@angular/core';
import { apiservice } from '../apiservice.service';
import { Ingrediente } from '../interfaces/ingrediente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  mostrarPestanaCreacion = false;

  constructor(private apiservice: apiservice, private router: Router) {}

  ngOnInit(): void {
    this.obtenerIngredientes();
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
    location.reload();
  }

  crearIngrediente(form: any): void {
    if (form.valid) {
      const nuevoIngrediente: any = {
        nombre: form.value.nombre,
        tipo: form.value.tipo,
        calorias: form.value.calorias,
        url: form.value.url
      };
      this.apiservice.crearIngrediente(nuevoIngrediente).subscribe()
      this.obtenerIngredientes();
      this.cerrarPestanaCreacion();
    }
  }
}
