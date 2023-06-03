import { TestpageComponent } from './testpage/testpage.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Importa otros componentes si tienes más rutas

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecciona al componente de inicio
  { path: 'home', component: AppComponent }, // Ruta para el componente NombreComponenteComponent
  // Agrega más rutas aquí si es necesario
  { path: '**', redirectTo: '/home' } // Ruta por defecto en caso de no encontrar ninguna ruta válida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
