import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { hashSync } from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  contrasenaControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,20}$')
  ]);

  contrasenaValida = false;

  constructor(private http: HttpClient, private router: Router) {}

  registrarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const contraseñaEncriptada = hashSync(form.value.contrasena, 10);

    const usuario = {
      nombre: form.value.nombre,
      contrasena: contraseñaEncriptada,
      sexo: form.value.sexo
    };

    this.http.post('https://localhost:7271/api/Usuario', usuario).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']); // Redirige al componente 'login'
      },
      error => {
        console.log(error);
      }
    );
  }

  validarContrasena() {
    this.contrasenaValida = this.contrasenaControl.valid;
  }
}
