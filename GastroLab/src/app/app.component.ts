import { Component } from '@angular/core';
import { apiservice } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GastroLab';

  constructor(private apiService: apiservice) {
    // Puedes utilizar el servicio aquí
  }
}
