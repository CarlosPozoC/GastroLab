import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { apiservice } from '../apiservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { hashSync } from 'bcryptjs';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  contrasenaControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,20}$')
  ]);

  contrasenaValida = false;

  constructor(private apiservice: apiservice, private router: Router) {}

  ngOnInit(): void {}

  registrarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const contraseñaEncriptada = hashSync(form.value.contrasena, 10);

    const usuario: any = {
      nombre: form.value.nombre,
      contrasena: contraseñaEncriptada,
      sexo: form.value.sexo
    };

    this.apiservice.crearUsuario(usuario).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['/login']);
  }

  validarContrasena() {
    this.contrasenaValida = this.contrasenaControl.valid;
  }
}
