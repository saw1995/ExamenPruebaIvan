import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inc-header',
  templateUrl: './inc-header.component.html',
  styleUrls: ['./inc-header.component.css']
})
export class IncHeaderComponent implements OnInit {

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  clic_listaCuenta(){
    this.router.navigate(['/lista']);
  }

  clic_listaMovimiento(){
    this.router.navigate(['/movimiento']);
  }

  clic_agregarCuenta(){
    this.router.navigate(['/agregar']);
  }

}
