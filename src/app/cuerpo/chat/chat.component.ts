import {Component, OnInit} from '@angular/core';
import {ServicioServService} from "../../servicio-serv.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public username;
  public imguser;
  public texto;
  public mensajevacio;
  public arraymensajes = [];

  constructor(private servicioServService: ServicioServService) {
  }

  ngOnInit() {
    this.servicioServService.conectado = true;
    this.username = this.servicioServService.nickname;
    this.imguser = this.servicioServService.imagen;
    this.servicioServService.mensajeP$.subscribe((listaP) => {
      this.arraymensajes.push(listaP);
    });
    this.servicioServService.mensajeO$.subscribe((listaO) => {
      this.arraymensajes.push(listaO);
    });
    this.servicioServService.mensajevacio$.subscribe((resultado) => {
      this.mensajevacio = resultado;
    });
  }

  enviar(event: any) {
    if (event.keyCode == 13) {
      this.servicioServService.envio(this.texto);
      this.texto = null;
    }
  }

}
