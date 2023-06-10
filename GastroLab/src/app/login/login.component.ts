import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { compareSync, hashSync } from 'bcryptjs';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  contrasena: string;
  sexo: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  async loginUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const nombre = form.value.nombre;
    const contraseña = form.value.contrasena;

    try {
      const response = await this.http.get<Usuario[]>('https://localhost:7271/api/usuario').toPromise();
      const usuarios: Usuario[] = response || [];
      // Manejar el caso en que la respuesta sea undefined
      const usuario = usuarios.find(u => u.nombre === nombre);

      if (usuario) {
        const contraseñaEncriptada: string = usuario.contrasena;

        if (compareSync(contraseña, contraseñaEncriptada)) {
          // Contraseña correcta, redirigir al componente TestpageComponent
          this.router.navigate(['/test-page']);
        } else {
          // Contraseña incorrecta
          console.log('Contraseña incorrecta');
        }
      } else {
        // No se encontró ningún usuario con ese nombre
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
