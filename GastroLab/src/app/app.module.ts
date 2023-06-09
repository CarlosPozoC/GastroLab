import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Importa otros componentes si es necesario

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    RegisterComponent,
    // Agrega otros componentes aquí si es necesario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule // Asegúrate de que AppRoutingModule esté importado aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
