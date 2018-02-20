import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServicioServService} from "../servicio-serv.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(private servicioServService: ServicioServService, private router: Router) { }

  ngOnInit() {
  }

  anadirConectado(){
    this.servicioServService.anadirjugadores();
    this.ir();
  }

  ir() {
    this.router.navigate([`../juego`]);
  }
  irachat(){
    this.servicioServService.quitajugador();
    this.irchat();
  }
  irchat(){
    this.router.navigate([`../chatGlobal`]);
  }
  desconectar(){
    this.servicioServService.desconectar();
  }
}
