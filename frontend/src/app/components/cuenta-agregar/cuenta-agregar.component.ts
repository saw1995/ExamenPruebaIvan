import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-agregar',
  templateUrl: './cuenta-agregar.component.html',
  styleUrls: ['./cuenta-agregar.component.css']
})
export class CuentaAgregarComponent implements OnInit {

  url:any = "https://localhost:44352/"
  nro_cuenta:any = "";
  tipo:any = "";
  moneda:any = "";
  nombre:any = "";
  saldo:any = "0";
  cantidadNroCuenta:any = 0;

  constructor(private location: Location, private http: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  change_selecTipo(){
    if(this.tipo == "AHO"){
      this.cantidadNroCuenta = 14
    }
    if(this.tipo == "CTE"){
      this.cantidadNroCuenta = 13
    }
  }

  agregarCuenta(){
    if(this.nombre != ""){
      if(this.nro_cuenta != ""){
        if(this.moneda != ""){
          if(this.tipo != ""){
            if(parseInt(this.cantidadNroCuenta) == ((this.nro_cuenta+ "").length)){
              Swal.fire({
                title: '¿Esta seguro de agregar la Cuenta?',
                html: "<b>Titular: </b>" + this.nombre,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Agregar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({title: 'Agregando Cuenta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
                  let parametros = {
                    'nro_cuenta': this.nro_cuenta,
                    'nombre': this.nombre,
                    'moneda': this.moneda,
                    'tipo': this.tipo,
                    'saldo': this.saldo,
                  };
                  this.http.post(this.url+"cuenta/agregarCuenta", parametros).subscribe((datos_recibidos:any) => {
                    Swal.close();
                    if(datos_recibidos.estado == "1"){
                      this.location.back();
                    }else{
                      Swal.fire("Problemas en el Servidor", "Aguarde unos minutos e intente nuevamente.", "warning");
                    }
                  });
                }
                
              });
            }else{
              Swal.fire("Nro de cuenta incorrecto", "la cantidad de digitos tiene que ser " + this.cantidadNroCuenta, "warning");
            }
          }else{
            Swal.fire("Campo Vacio", "Seleccione el tipo de cuenta.", "warning");
          }
        }else{
          Swal.fire("Campo Vacio", "Seleccione el tipo moneda.", "warning");
        }
      }else{
        Swal.fire("Campo Vacio", "Debe agregar el numero de cuenta.", "warning");
      }
    }else{
      Swal.fire("Campo Vacio", "Debe agregar el nombre del titular.", "warning");
    }
  }
}

