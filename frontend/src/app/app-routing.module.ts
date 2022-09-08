import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CuentaAgregarComponent } from './components/cuenta-agregar/cuenta-agregar.component';
import { CuentaListaComponent } from './components/cuenta-lista/cuenta-lista.component';
import { MovimientoListaComponent } from './components/movimiento-lista/movimiento-lista.component';
import { RetiroDepositoComponent } from './components/retiro-deposito/retiro-deposito.component';

const routes: Routes = [
  { path: '', component: InicioComponent,
    children: [
      { path: 'lista', component: CuentaListaComponent},
      { path: 'movimiento/:nro_cuenta', component: MovimientoListaComponent},
      { path: 'retirodeposito/:nro_cuenta/:titulo', component: RetiroDepositoComponent},
      { path: 'agregar', component: CuentaAgregarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
