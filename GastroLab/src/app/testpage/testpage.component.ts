import { Component, OnInit } from '@angular/core';
import { apiservice } from '../apiservice.service';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  contrasena: string;
  sexo: string;
}

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  usuario: Usuario | null = null;
  datos: any;

  constructor(private apiservice: apiservice, private router: Router) {}

  ngOnInit(): void {
    this.apiservice.obtenerRecetas().subscribe(
      (data: any) => {
        this.datos = data;
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
}
