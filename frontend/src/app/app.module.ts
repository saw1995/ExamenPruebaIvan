import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CuentaAgregarComponent } from './components/cuenta-agregar/cuenta-agregar.component';
import { CuentaListaComponent } from './components/cuenta-lista/cuenta-lista.component';
import { IncHeaderComponent } from './components/inc-header/inc-header.component';
import { MovimientoListaComponent } from './components/movimiento-lista/movimiento-lista.component';
import { RetiroDepositoComponent } from './components/retiro-deposito/retiro-deposito.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CuentaAgregarComponent,
    CuentaListaComponent,
    IncHeaderComponent,
    MovimientoListaComponent,
    RetiroDepositoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
