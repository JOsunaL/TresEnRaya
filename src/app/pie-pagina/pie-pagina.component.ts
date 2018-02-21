import { Component, OnInit } from '@angular/core';
import {ServicioServService} from "../servicio-serv.service";

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.css']
})
export class PiePaginaComponent implements OnInit {

  constructor(public servicioServService: ServicioServService) { }

  ngOnInit() {
  }

}
