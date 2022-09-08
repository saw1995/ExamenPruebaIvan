import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimiento-lista',
  templateUrl: './movimiento-lista.component.html',
  styleUrls: ['./movimiento-lista.component.css']
})
export class MovimientoListaComponent implements OnInit {

  url:any = "https://localhost:44352/"

  nro_cuenta:any = ""

  listaMovimiento:any = []

  constructor(private location: Location, private http: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nro_cuenta = this.route.snapshot.paramMap.get("nro_cuenta");
    this.listaMovimientosById()
  }

  listaMovimientosById()
  {
    Swal.fire({title: 'Buscando Movimientos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      'nro_cuenta': this.nro_cuenta,
    };
    this.http.post(this.url+"movimiento/listaMovimientosById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      console.log(datos_recibidos)
      this.listaMovimiento = datos_recibidos.lista;
      for(let i=0; i<this.listaMovimiento.length; i++){
        if(this.listaMovimiento[i]["tipo"] == "A"){
          this.listaMovimiento[i]["tipo"] = "Deposito"
        }
        
      }

      
    });
  }
}
