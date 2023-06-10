import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apiservice } from '../apiservice.service';
import { compareSync } from 'bcryptjs';
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
  constructor(private apiservice: apiservice, private router: Router) {}

  async loginUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const nombre = form.value.nombre;
    const contraseña = form.value.contrasena;

    try {
      const usuarios = await this.apiservice.obtenerUsuarios().toPromise() as Usuario[];
      const usuario = usuarios.find(u => u.nombre === nombre);

      if (usuario) {
        const contraseñaEncriptada: string = usuario.contrasena;

        if (compareSync(contraseña, contraseñaEncriptada)) {
          // Contraseña correcta, almacenar información del usuario logeado
          this.storeLoggedInUser(usuario);

          // Redirigir al componente TestpageComponent
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

  private storeLoggedInUser(user: Usuario): void {
    // Almacena la información del usuario logeado en el localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
}
