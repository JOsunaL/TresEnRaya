import { Component } from '@angular/core';
import {ServicioServService} from "./servicio-serv.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message: string;

  constructor( public servicioServService: ServicioServService) {}
}
