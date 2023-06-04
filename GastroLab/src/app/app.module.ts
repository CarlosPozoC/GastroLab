import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// Importa otros componentes si es necesario

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent
    // Agrega otros componentes aquí si es necesario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Asegúrate de que AppRoutingModule esté importado aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
