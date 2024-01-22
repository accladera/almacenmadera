import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {enumActionsAbm} from "../../../enums/enumActionsAbm";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Material} from "../interfaces/material";
import {AlmacenFilter} from "../interfaces/almacen-filter";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  baseUrl = `${environment.apiUrl}Materials`;
  form: FormGroup = new FormGroup({});
  material!: Material;
  // actionId: number = enumActionsAbm.view;
  actionId: number = enumActionsAbm.add;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  initializeFormGroup(material: Material| null): void {
    this.form = this.formBuilder.group({
      idMaterial: new FormControl(material ? material.idMaterial : ''),

      nombre: new FormControl(material ? material.nombre : '', [
        Validators.required,
      ]),
      descripcion: new FormControl(material ? material.descripcion : '', [
        Validators.required,
      ]),
      valorUnitario: new FormControl(material ? material.valorUnitario : '', [
        Validators.required,
      ]),
      stockMinimo: new FormControl(material ? material.stockMinimo : '', [
        Validators.required,
      ]),
      altura: new FormControl(material ? material.altura : '', [
        Validators.required,
      ]),
      peso: new FormControl(material ? material.peso : '', [
        Validators.required,
      ]),
      anchura: new FormControl(material ? material.descripcion : '', [
        Validators.required,
      ])

    });

  }
  save(material: Material): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post<Material>(url, material);
  }
  update(material: Material): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.put<Material>(url, material);
  }
  delete(materialId: string): Observable<any>{
    const url = `${this.baseUrl}`;
    return this.http.delete<any>(url, {body: {id: materialId} });
  }
  getAllByAlmacenId(filter: AlmacenFilter): Observable<any> {
    const url = `${this.baseUrl}/byAlmacen`;
    return this.http.post<Material[]>(url,filter);
  }



}
