import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrdenComponent } from '../orden/orden.component';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: Orden[] = [];
  bsModalRef: BsModalRef;
  constructor(private http: HttpClient, private modalService: BsModalService) { 
    this.getOrdenes();
  }

  ngOnInit() {
  }

  getOrdenes() {
    this.http.get('http://localhost:3000/orders').subscribe((ordenes: Orden[]) => {
      this.ordenes = ordenes;
    });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(OrdenComponent);
    this.bsModalRef.content.onClose.subscribe(orden => {
      this.ordenes.push(orden);
    });
  }
}


export interface Orden {
  id: number;
  idAsesor: number;
  idCliente: number;
  idAcudiente: number;
  producto: string;
  especie: string;
  cantidad: number;
  valorUnidad: number;
  valorTotal: number;
}