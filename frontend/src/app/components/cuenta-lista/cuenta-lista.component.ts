import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.css']
})
export class CuentaListaComponent implements OnInit {

  url:any = "https://localhost:44352/"

  nro_cuenta:any = ""

  listaCuenta:any = []

  constructor(private location: Location, private http: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaCuentas()
  }

  click_retiro(nro_cuenta:any){
    this.nro_cuenta = nro_cuenta;
    this.router.navigate(['/retirodeposito', nro_cuenta, "Retiro"]);
  }

  click_deposito(nro_cuenta:any){
    this.nro_cuenta = nro_cuenta;
    this.router.navigate(['/retirodeposito', nro_cuenta, "Deposito"]);
  }

  click_movimientos(nro_cuenta:any){
    this.nro_cuenta = nro_cuenta;
    this.router.navigate(['/movimiento', nro_cuenta]);
  }

  depositoRetiroByNroCuenta(){

  }

  listaCuentas()
  {
    Swal.fire({title: 'Buscando Cuentas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      'estado': "1",
    };
    this.http.post(this.url+"cuenta/listaCuentas", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      this.listaCuenta = datos_recibidos.lista;
    });
  }
}
