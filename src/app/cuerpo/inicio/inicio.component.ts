import { Component, OnInit } from '@angular/core';
import {ServicioServService} from "../../servicio-serv.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public username;
  public userimage;

  constructor(private servicioServService: ServicioServService) { }

  ngOnInit() {
    this.servicioServService.conectado = true;
    this.userimage = this.servicioServService.imagen;
    this.username = this.servicioServService.nickname;
  }

}
