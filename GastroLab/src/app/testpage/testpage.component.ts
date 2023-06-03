import { Component, OnInit } from '@angular/core';
import { apiservice } from '../apiservice.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  datos: any;

  constructor(private apiservice: apiservice) {}

  ngOnInit() {
    this.apiservice.obtenerDatosDeRecetas().subscribe((data) => {
      this.datos = data;
    });
  }
}
