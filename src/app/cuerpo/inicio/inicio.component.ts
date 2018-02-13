import { Component, OnInit } from '@angular/core';
import {ServicioServService} from "../../servicio-serv.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private servicioServService: ServicioServService) { }

  ngOnInit() {
    this.servicioServService.conectado = true;
  }

}
