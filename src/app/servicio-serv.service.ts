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
  public imagen;
  public nickname;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('conectar', (mensaje) => {
      this.verificaUsuario.next(mensaje);
    });
  }

  public newuser(usuario) {
    this.socket.emit('add user', usuario);
  };
}
