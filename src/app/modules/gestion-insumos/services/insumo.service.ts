import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Insumo} from "../../gestion-insumos/interfaces/insumo";
import {enumActionsAbm} from "../../../enums/enumActionsAbm";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AlmacenFilter} from "../interfaces/almacen-filter";

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  baseUrl = `${environment.apiUrl}Insumos`;
  form: FormGroup = new FormGroup({});
  insumo!: Insumo;
  // actionId: number = enumActionsAbm.view;
  actionId: number = enumActionsAbm.add;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }



  initializeFormGroup(insumo: Insumo| null): void {
    this.form = this.formBuilder.group({
      idInsumo: new FormControl(insumo ? insumo.idInsumo : ''),

      nombre: new FormControl(insumo ? insumo.nombre : '', [
        Validators.required,
      ]),
      descripcion: new FormControl(insumo ? insumo.descripcion : '', [
        Validators.required,
      ]),
      valorUnitario: new FormControl(insumo ? insumo.valorUnitario : '', [
        Validators.required,
      ]),
      stockMinimo: new FormControl(insumo ? insumo.stockMinimo : '', [
        Validators.required,
      ]),
      altura: new FormControl(insumo ? insumo.altura : '', [
        Validators.required,
      ]),
      peso: new FormControl(insumo ? insumo.peso : '', [
        Validators.required,
      ]),
      anchura: new FormControl(insumo ? insumo.descripcion : '', [
        Validators.required,
      ]),
    });

  }
  save(insumo: Insumo): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post<Insumo>(url, insumo);
  }
  update(insumo: Insumo): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.put<Insumo>(url, insumo);
  }
  delete(insumoId: string): Observable<any>{
    const url = `${this.baseUrl}`;
    return this.http.delete<any>(url, {body: {id: insumoId} });
  }
  getAllByAlmacenId(filter: AlmacenFilter): Observable<any> {
    const url = `${this.baseUrl}/byAlmacen`;
    return this.http.post<Insumo[]>(url,filter);
  }



}
