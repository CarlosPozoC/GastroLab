import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RecetasComponent } from './recetas/recetas.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecetaDetailsComponent } from './receta-details/receta-details.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


// Importa otros componentes si es necesario

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    RecetasComponent,
    IngredientesComponent,
    PerfilComponent,
    RecetaDetailsComponent,
    // Agrega otros componentes aquí si es necesario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule.forRoot()   // Asegúrate de que AppRoutingModule esté importado aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
