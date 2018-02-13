import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServicioServService} from "../servicio-serv.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public imagen;
  public nickname;

  constructor(private servicioServService: ServicioServService) { }

  ngOnInit() {
    this.imagen = this.servicioServService.imagen;
    this.nickname = this.servicioServService.nickname;
  }

}
