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
  mostrarBotones=false;
  receta!: Receta;
  ingredientes: Ingrediente[] = [];
  ingredientesTotal: Ingrediente[] =[];
  opiniones: Opinion[] = [];
  valoracion: number = 0;
  usuario!:Usuario;
  mostrarFormulario = false;
  recetasUsuario: Receta[]=[];
  opinionesUsuario: Opinion[]=[];

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
    this.obtenerIngredientes();
    if (this.usuario) {
      this.obtenerRecetas(this.usuario.id);
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
            this.verificarOpiniones();
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
      this.apiservice.obtenerOpinionesUsuario(this.usuario.id).subscribe(
        (opiniones: Opinion[]) => {
          this.opinionesUsuario = opiniones;
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

  actualizarReceta(form: any) {
    const ingredientesSeleccionados = this.ingredientesTotal.filter(ingrediente => form.value[ingrediente.id]);
    const ingredientesIds = ingredientesSeleccionados.map(ingrediente => ingrediente.id);
    const nuevaReceta: any = {
      id:this.receta.id,
      nombre: form.value.nombre,
      descripcion: form.value.descripcion,
      tipo: form.value.tipo,
      url: form.value.url,
      ingredientesreceta: ingredientesIds
    }
    this.apiservice.updateReceta(nuevaReceta).subscribe();
    this.obtenerReceta(this.receta.id);
  }
  deleteReceta(){
    this.apiservice.deleteReceta(this.receta.id).subscribe();
    this.router.navigate(['/recetas']);
  }

  deleteOpinion(opinionid:number){
    this.apiservice.deleteOpinion(opinionid).subscribe();
    location.reload();
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  obtenerIngredientes(): void {
    this.apiservice.obtenerIngredientes().subscribe(
      (data: Ingrediente[]) => {
        this.ingredientesTotal = data;
      },
      (error: any) => {
        console.error('Error al obtener los ingredientes:', error);
      }
    );
  }

  confirmarBorrado(): void {
    if (window.confirm('¿Estás seguro de borrar la receta?')) {
      this.deleteReceta();
    }
  }

  confirmarBorrado2(opinionid:number): void {
    if (window.confirm('¿Estás seguro de borrar la receta?')) {
      this.deleteOpinion(opinionid);
    }
  }

  obtenerRecetas(UsuarioId: number): void {
    this.apiservice.obtenerRecetasUsuario(UsuarioId).subscribe(
      (recetas: Receta[]) => {
        this.recetasUsuario = recetas;
        this.verificarRecetaActual();
      }
    );
  }

  verificarRecetaActual(): void {
    if (this.recetasUsuario.some(receta => receta.id === this.receta.id)) {
      this.mostrarBotones = true;
    } else {
      this.mostrarBotones = false;
    }
  }

  verificarOpiniones(): void {
    this.opiniones.forEach(opinion => {
      const coincidente = this.opinionesUsuario.some(opinionUsuario => opinionUsuario.id === opinion.id);
      opinion.mostrarOpinion = coincidente;
    });
  }
}
