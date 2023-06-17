import { TestpageComponent } from './testpage/testpage.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { RecetasComponent } from './recetas/recetas.component';
import { RecetaDetailsComponent } from './receta-details/receta-details.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test-page', component: TestpageComponent },
  { path: 'mi-perfil', component: PerfilComponent },
  { path: 'ingredientes', component: IngredientesComponent},
  { path: 'recetas', component: RecetasComponent},
  { path: 'recetas/:id', component: RecetaDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

