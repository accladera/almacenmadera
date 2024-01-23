import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../interfaces/producto";
import {enumActionsAbm} from "../../../enums/enumActionsAbm";
import {AlmacenFilter} from "../interfaces/almacen-filter";
import {InventarioProducto} from "../interfaces/inventarioProducto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  baseUrlProducto = `${environment.apiUrl}Producto`;
  baseUrlAlmacen = `${environment.apiUrl}Almacen`;
  form: FormGroup = new FormGroup({});
  formInventario: FormGroup = new FormGroup({});
  producto!: Producto;
  // actionId: number = enumActionsAbm.view;
  actionId: number = enumActionsAbm.add;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }



  initializeFormGroup(producto: Producto| null): void {
    this.form = this.formBuilder.group({
      idProducto: new FormControl(producto ? producto.idProducto : ''),

      nombre: new FormControl(producto ? producto.nombre : '', [
        Validators.required,
      ]),
      descripcion: new FormControl(producto ? producto.descripcion : '', [
        Validators.required,
      ]),
      valorUnitario: new FormControl(producto ? producto.valorUnitario : '', [
        Validators.required,
      ]),
      stockMinimo: new FormControl(producto ? producto.stockMinimo : '', [
        Validators.required,
      ]),
      altura: new FormControl(producto ? producto.altura : '', [
        Validators.required,
      ]),
      peso: new FormControl(producto ? producto.peso : '', [
        Validators.required,
      ]),
      anchura: new FormControl(producto ? producto.descripcion : '', [
        Validators.required,
      ]),
      codEstado: new FormControl(producto ? producto.codEstado : '', [
        Validators.required,
      ]),
    });

  }

  createFormInventarioProducto(inventarioProducto: InventarioProducto| null): void {
    this.formInventario = this.formBuilder.group({
      IdProducto: new FormControl(inventarioProducto ? inventarioProducto.idProducto : ''),
      idAlmacen: new FormControl(inventarioProducto ? inventarioProducto.idAlmacen : ''),
    });

  }
  save(producto: Producto): Observable<any> {
    const url = `${this.baseUrlProducto}`;
    return this.http.post<Producto>(url, producto);
  }
  update(producto: Producto): Observable<any> {
    const url = `${this.baseUrlProducto}`;
    return this.http.put<Producto>(url, producto);
  }
  delete(productoId: string): Observable<any>{
    const url = `${this.baseUrlProducto}`;
    return this.http.delete<any>(url, {body: {id: productoId} });
  }
  getAll(): Observable<any> {
    const url = `${this.baseUrlProducto}/all`;
    return this.http.get<Producto[]>(url);
  }
  getAllByAlmacenId(filter: AlmacenFilter): Observable<any> {
    const url = `${this.baseUrlProducto}/byAlmacen`;
    return this.http.post<Producto[]>(url,filter);
  }
  addProductoToAlmacen(inventario: InventarioProducto): Observable<any> {
    const url = `${this.baseUrlAlmacen}/almacenarProducto`;
    return this.http.post<Producto>(url,inventario);
  }





}
