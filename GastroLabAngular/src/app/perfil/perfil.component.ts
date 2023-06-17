import { Opinion } from './../interfaces/opinion.interface';
import { Usuario } from './../interfaces/usuario.interface';
import { Ingrediente } from './../interfaces/ingrediente.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiservice } from '../apiservice.service';
import { Receta } from '../interfaces/receta.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  recetas: Receta[]= [];
  opiniones: Opinion[]= [];

  constructor(private router: Router,private apiservice: apiservice) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.usuario = JSON.parse(loggedInUser);
      this.obtenerRecetas(this.usuario.id);
      this.obtenerOpiniones(this.usuario.id);
    } else {
      // Si no hay usuario logeado, redirigir al componente de login
      this.router.navigate(['/login']);
    }
  }
  obtenerRecetas(UsuarioId:number):void{
    this.apiservice.obtenerRecetasUsuario(UsuarioId).subscribe(
      (recetas:Receta[])=>{
        this.recetas=recetas
      }
    )
  }
  obtenerOpiniones(UsuarioId:number):void{
    this.apiservice.obtenerOpinionesUsuario(UsuarioId).subscribe(
      (opiniones:Opinion[])=>{
        this.opiniones=opiniones
      }
    )
  }
}
