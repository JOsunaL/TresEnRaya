import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ServicioServService {
  private url = '';
  private socket;
  public conectado = false;
  public verificaUsuario = new Subject<any>();
  public verificaUsuario$ = this.verificaUsuario.asObservable();
  public comenzar = new Subject<any>();
  public comenzar$ = this.comenzar.asObservable();
  public contrincante = new Subject<any>();
  public contrincante$ = this.contrincante.asObservable();
  public vacia = new Subject<any>();
  public vacia$ = this.vacia.asObservable();
  public cambio = new Subject<any>();
  public cambio$ = this.cambio.asObservable();
  public turno = new Subject<any>();
  public turno$ = this.turno.asObservable();
  public puntosP = new Subject<any>();
  public puntosP$ = this.puntosP.asObservable();
  public puntosC = new Subject<any>();
  public puntosC$ = this.puntosC.asObservable();
  public ultimoG = new Subject<any>();
  public ultimoG$ = this.ultimoG.asObservable();
  public ganador = new Subject<any>();
  public ganador$ = this.ganador.asObservable();
  public desconectado = new Subject<any>();
  public desconectado$ = this.desconectado.asObservable();
  public empate = new Subject<any>();
  public empate$ = this.empate.asObservable();
  public mensajeP = new Subject<any>();
  public mensajeP$ = this.mensajeP.asObservable();
  public mensajeO = new Subject<any>();
  public mensajeO$ = this.mensajeO.asObservable();
  public mensajevacio = new Subject<any>();
  public mensajevacio$ = this.mensajevacio.asObservable();
  public imagen;
  public nickname;

  constructor() {
    this.inicio();
  }

  inicio() {
    this.socket = io(this.url);
    this.socket.on('conectar', (mensaje) => {
      this.verificaUsuario.next(mensaje);
    });
    this.socket.on('preparar juego', (pase) => {
      this.comenzar.next(pase);
    });
    this.socket.on('recibir usuario', (usuario) => {
      this.contrincante.next(usuario);
    });
    this.socket.on('casilla vacia', (consulta) => {
      this.vacia.next(consulta);
    });
    this.socket.on('cambiar tablero', (tablero) => {
      this.socket.emit('pedir puntosP', "");
      this.socket.emit('pedir puntosC', "");
      this.cambio.next(tablero);
    });
    this.socket.on('turno', (puerta) => {
      this.turno.next(puerta);
    });
    this.socket.on('devuelvo puntosP', (puntos) => {
      this.puntosP.next(puntos);
    });
    this.socket.on('devuelvo puntosC', (puntos) => {
      this.puntosC.next(puntos);
    });
    this.socket.on('ganador anterior', (nombreganador) => {
      this.ultimoG.next(nombreganador);
    });
    this.socket.on('ganador', (nombreganador) => {
      this.ganador.next(nombreganador);
    });
    this.socket.on('usuario desconectado', (nombreusuario) => {
      this.desconectado.next(nombreusuario);
    });
    this.socket.on('userdesconectado', () => {
      this.socket.emit('iniciar juego');
    });
    this.socket.on('mensajeP', (listaP) => {
      this.mensajeP.next(listaP);
    });
    this.socket.on('mensajeO', (listaO) => {
      this.mensajeO.next(listaO);
    });
    this.socket.on('empate', (mensaje) => {
      this.empate.next(mensaje);
    });
    this.socket.on('mensaje vacio', (resultado) => {
      this.mensajevacio.next(resultado);
    })
  }

  public newuser(usuario) {
    this.nickname = usuario[0];
    this.imagen = usuario[1];
    this.socket.emit('add user', usuario);
  };

  public quitajugador() {
    this.socket.emit('quitar jugador');
  }

  public comenzarJ() {
    this.socket.emit('iniciar juego');
  };

  public anadirjugadores() {
    this.socket.emit('sumar jugador');
  }

  public pedir_usuarios() {
    this.socket.emit('pedir usuarios');
  }

  public seleccionaC(posicionC) {
    this.socket.emit('cambia casilla', posicionC)
  }

  public puntos_propios() {
    this.socket.emit('pedir puntosP')
  }

  public puntos_contrincante() {
    this.socket.emit('pedir puntosC')
  }

  public envio(texto) {
    this.socket.emit('enviar', texto)
  }

  public desconectar() {
    this.socket.close();
    this.inicio();
  }
}
