import { Component, OnInit } from '@angular/core';
import {ServicioServService} from "../../servicio-serv.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private servicioServService: ServicioServService) { }

  ngOnInit() {
    this.servicioServService.conectado = true;
  }

}
