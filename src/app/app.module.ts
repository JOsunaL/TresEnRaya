import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {CabeceraComponent} from './cabecera/cabecera.component';
import {PiePaginaComponent} from './pie-pagina/pie-pagina.component';
import {ServicioServService} from "./servicio-serv.service";
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import {LoginComponent} from './cuerpo/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { ErrorComponent } from './cuerpo/error/error.component';
import { InicioComponent } from './cuerpo/inicio/inicio.component';
import { ChatComponent } from './cuerpo/chat/chat.component';
import { JuegoComponent } from './cuerpo/juego/juego.component';

const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'inicioUsuario', component: InicioComponent},
  {path: 'juego', component: JuegoComponent},
  {path: 'chatGlobal', component: ChatComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PiePaginaComponent,
    CuerpoComponent,
    LoginComponent,
    ErrorComponent,
    InicioComponent,
    ChatComponent,
    JuegoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ServicioServService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
