import {Component, OnInit} from '@angular/core';
import {ServicioServService} from "../../servicio-serv.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario;
  public conjunto;
  public imagenseleccionada = 1;
  public mensajeError = false;


  constructor(private servicioServService: ServicioServService, private router: Router) {
  }

  ngOnInit() {
    this.servicioServService.conectado = false;
    this.servicioServService.verificaUsuario$.subscribe((mensaje) => {
      this.mensajeError = mensaje;
      if (mensaje.endsWith("se ha conectado")) {
        this.router.navigate(['/inicioUsuario']);
      }
    })
  }

  cogerImagen() {
    if (this.imagenseleccionada == 1) {
      return "../../../assets/user1.png";
    }
    if (this.imagenseleccionada == 2) {
      return "../../../assets/user2.png";
    }
    if (this.imagenseleccionada == 3) {
      return "../../../assets/user3.png";
    }
    if (this.imagenseleccionada == 4) {
      return "../../../assets/user4.png";
    }
    if (this.imagenseleccionada == 5) {
      return "../../../assets/user5.png";
    }
  }

  accederEnter(event: any) {
    if (event.keyCode == 13) {
      this.acceder();
    }
  }

  acceder() {
    this.conjunto = [this.usuario, this.cogerImagen()];
    this.servicioServService.newuser(this.conjunto);
  }

  seleccionarImagen(numero_imagen) {
    this.imagenseleccionada = numero_imagen;
  }
}
