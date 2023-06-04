import { TestpageComponent } from './testpage/testpage.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Importa otros componentes si tienes más rutas

const routes: Routes = [
  { path: '', component: AppComponent }, // Ruta para el componente NombreComponenteComponent
  { path: '**', redirectTo: '/' } // Ruta por defecto en caso de no encontrar ninguna ruta válida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
