import { Component, OnInit, TemplateRef, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Orden } from '../ordenes/ordenes.component';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  public onClose: Subject<Orden>;
  
  resultado: any;
  modalRef2: BsModalRef;

  ordenForm = new FormGroup({
    idAsesor: new FormControl(),
    idCliente: new FormControl(),
    idAcudiente: new FormControl(),
    producto: new FormControl(),
    especie: new FormControl(),
    cantidad: new FormControl(),
    valorUnidad: new FormControl(),
    valorTotal: new FormControl()
  });
  constructor(private http: HttpClient, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  crearOrden(template: TemplateRef<any>) {
    const orden: Orden = {
      id: -1,
      idAsesor: this.ordenForm.get('idAsesor').value,
      idCliente: this.ordenForm.get('idCliente').value,
      idAcudiente: this.ordenForm.get('idAcudiente').value,
      producto: this.ordenForm.get('producto').value,
      especie: this.ordenForm.get('especie').value,
      cantidad: this.ordenForm.get('cantidad').value,
      valorUnidad: this.ordenForm.get('valorUnidad').value,
      valorTotal: this.ordenForm.get('valorTotal').value
    };
    
    this.http.post('http://localhost:3000/orders', orden, { observe: 'response' }).subscribe((response) => {
      if (response.status === 210) {
        this.resultado = { ... response.body };
        this.resultado.titulo = response.statusText;
        this.openModal2(template);
      }

      if (response.status === 200) {
        const orden = { ... response.body };
        this.onClose.next(orden as Orden);
        this.bsModalRef.hide();
      }
    });
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
}
