import { Receta } from './../interfaces/receta.interface';
import { Component, OnInit } from '@angular/core';
import { apiservice } from '../apiservice.service';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario.interface';


@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  usuario: Usuario | null = null;
  datos: Receta[]=[];
  imagenes: string[] = [];

  constructor(private apiservice: apiservice, private router: Router) {}

  ngOnInit(): void {
    this.apiservice.obtenerRecetas().subscribe(
      (data: Receta[]) => {
        this.datos = data;
        this.asignarValoracionMedia();
        this.ordenarPorValoracionMedia();
        this.generarImagenesAleatorias();
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.usuario = JSON.parse(loggedInUser) as Usuario;
    } else {
      // Si no hay usuario logeado, redirigir al componente de login
      this.router.navigate(['/login']);
    }
  }
  asignarValoracionMedia(): void {
    this.datos.forEach(receta => {
      this.apiservice.obtenerRecetaValoraciones(receta.id).subscribe(
        (valoracionMedia: number) => {
          receta.ValoracionMedia = valoracionMedia;
        },
        (error: any) => {
          console.error('Error al obtener el usuario de la opinión:', error);
        }
      );
    });
  }
  getValoracionMediaStars(valoracionMedia: number): string {
    const fullStars = Math.floor(valoracionMedia);
    const emptyStars = 5 - fullStars;

    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }
  ordenarPorValoracionMedia(): void {
    this.datos.sort((a, b) => b.ValoracionMedia - a.ValoracionMedia);
    this.datos = this.datos.slice(0, 3);
  }
  generarImagenesAleatorias(): void {
    const maxIndex = this.datos.length - 1;
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
      this.imagenes[i] = this.datos[randomIndex].url;
    }
  }

}
