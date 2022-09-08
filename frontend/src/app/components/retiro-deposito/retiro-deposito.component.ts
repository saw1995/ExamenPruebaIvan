import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retiro-deposito',
  templateUrl: './retiro-deposito.component.html',
  styleUrls: ['./retiro-deposito.component.css']
})
export class RetiroDepositoComponent implements OnInit {
  
  url:any = "https://localhost:44352/"
  nro_cuenta:any = "";
  saldo:any = "";
  titulo:any = "";
  importe:any = "";
  glosa:any = "";
  tipo:any = "";

  constructor(private location: Location, private http: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nro_cuenta = this.route.snapshot.paramMap.get("nro_cuenta");
    this.titulo = this.route.snapshot.paramMap.get("titulo");
    if(this.titulo == "Retiro"){
      this.tipo = "D"
    }
    if(this.titulo == "Deposito"){
      this.tipo = "A"
    }
    this.cuentaByNroCuenta()
  }

  cuentaByNroCuenta()
  {
    Swal.fire({title: 'Buscando Cuentas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      'nro_cuenta': this.nro_cuenta,
    };
    this.http.post(this.url+"cuenta/cuentaByNroCuenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      console.log(datos_recibidos.lista)
      let cuenta = datos_recibidos.lista[0];
      this.saldo = cuenta.saldo
    });
  }

  depositoRetiroByNroCuenta(){
    if(this.nro_cuenta != ""){
      if(this.importe != ""){
        if(this.glosa != ""){
          if(this.tipo == "D"){
            console.log(parseFloat(this.saldo), parseFloat(this.importe))
            if(parseFloat(this.saldo) >= parseFloat(this.importe)){
              this.agregarMovimiento();
            }else{
              Swal.fire("Saldo insuficiente", "Ingrese otro importe menor a su saldo", "warning");
            }
          }
          if(this.tipo == "A"){
            this.agregarMovimiento();
          }
        }else{
          Swal.fire("Campo Vacio", "Debe agregar la glosa", "warning");
        }
      }else{
        Swal.fire("Campo Vacio", "Debe agregar el importe del " + this.titulo, "warning");
      }
    }else{
      Swal.fire("Campo Vacio", "Debe agregar el numero de cuenta.", "warning");
    }
  }

  agregarMovimiento(){
    Swal.fire({
      title: '¿Esta seguro de realizar el ' + this.titulo + '?',
      html: "<b>importe: </b>" + this.importe,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Realizar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({title: 'Agregando transaccion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
        let parametros = {
          'nro_cuenta': this.nro_cuenta,
          'importe': this.importe + "",
          'glosa': this.glosa,
          'tipo': this.tipo,
        };
        console.log(parametros)
        this.http.post(this.url+"movimiento/depositoRetiroByNroCuenta", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();
          if(datos_recibidos.estado == "1"){
            this.location.back();
          }else{
            Swal.fire("Problemas en el Servidor", "Aguarde unos minutos e intente nuevamente.", "warning");
          }
        });
      }
      
    });
  }

}
