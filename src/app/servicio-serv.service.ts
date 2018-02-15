import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ServicioServService {
  private url = 'http://localhost:3000';
  private socket;
  public conectado = false;
  public verificaUsuario = new Subject<any>();
  public verificaUsuario$ = this.verificaUsuario.asObservable();
  public comenzar = new Subject<any>();
  public comenzar$ = this.comenzar.asObservable();
  public imagen;
  public nickname;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('conectar', (mensaje) => {
      this.verificaUsuario.next(mensaje);
    });
    this.socket.on('preparar juego', (pase) => {
      this.comenzar.next(pase);
    })
  }

  public newuser(usuario) {
    this.nickname = usuario[0];
    this.imagen = usuario[1];
    this.socket.emit('add user', usuario);
  };
  public comenzarJ(){
    this.socket.emit('iniciar juego', "");
  };
  public anadirjugadores(){
    this.socket.emit('sumar jugador', "")
  }
}
