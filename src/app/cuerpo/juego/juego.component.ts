import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {ServicioServService} from "../../servicio-serv.service";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  public username;
  public tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  public comienzo = false;
  public rival;
  public pointsPropios;
  public pointsRival;
  public turno;
  public casillaVacia;
  public ganador_anterior;
  public ganador;
  public desconectado;
  public marcarEmpate;

  constructor(private route: ActivatedRoute, public servicioServService: ServicioServService) {
  }

  ngOnInit() {
    this.servicioServService.conectado = true;
    this.username = this.servicioServService.nickname;
    this.servicioServService.comenzar$.subscribe((pasar) => {
      if (pasar === true) {
        this.ganador_anterior = false;
        this.servicioServService.puntos_propios();
        this.servicioServService.puntos_contrincante();
        this.servicioServService.pedir_usuarios();
        this.comienzo = pasar;
      } else if (pasar === false){
        this.comienzo = pasar;
      }
    });
    this.servicioServService.contrincante$.subscribe((contrincante) => {
      this.rival = contrincante;
      this.desconectado = false;
    });
    this.servicioServService.cambio$.subscribe((tablero) => {
      this.tablero = tablero;
    });
    this.servicioServService.turno$.subscribe((turno_bool) => {
      this.turno = turno_bool;
    });
    this.servicioServService.vacia$.subscribe((vacio) => {
      this.casillaVacia = vacio;
    });
    this.servicioServService.puntosP$.subscribe((puntos) => {
      this.pointsPropios = puntos;
    });
    this.servicioServService.puntosC$.subscribe((puntos) => {
      this.pointsRival = puntos;
    });
    this.servicioServService.ultimoG$.subscribe((usuario) => {
      this.ganador_anterior = usuario;
      this.marcarEmpate = false;
    });
    this.servicioServService.ganador$.subscribe((usuario) => {
      this.ganador = usuario;
    });
    this.servicioServService.desconectado$.subscribe((usuario) => {
      this.desconectado = usuario;
    });
    this.servicioServService.empate$.subscribe((empate) =>{
      this.marcarEmpate = empate;
      this.ganador_anterior = false;
    });
    this.comenzar();
  }

  comenzar() {
    this.desconectado = false;
    this.marcarEmpate = false;
    this.servicioServService.comenzarJ()
  }

  cambio(posicion) {
    this.servicioServService.seleccionaC(posicion);
  }
}
