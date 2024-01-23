import {Component, signal} from '@angular/core';
import {Router} from "@angular/router";
import {ProductoService} from "../../services/producto.service";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";
import {Producto} from "../../interfaces/producto";
import {InventarioProducto} from "../../interfaces/inventarioProducto";

@Component({
  selector: 'app-producto-include',
  templateUrl: './producto-include.component.html',
  styleUrls: ['./producto-include.component.css']
})
export class ProductoIncludeComponent {
  usuarioId = "";
  readonly enumActionsAbm = enumActionsAbm;
  public inventarioProducto: InventarioProducto;
  public dataProductos: object[];
  productos: Producto[] = [];
  almacenId="F5064752-9BD6-43B6-9A33-DAD27F2238C3";

  protected fieldsEstadosProductos: object = {value: 'valor', text: 'descripcion'};


  productosRoute = '/productos/';

  public locale = 'es-BO';
  protected fieldsProductos: object = {value: 'id', text: 'nombre'};

  constructor(
    private router: Router,
    public productoService: ProductoService,
  ) {
    this.inventarioProducto = this.productoService.formInventario.value;
    this.dataProductos = this.productos;
    this.locale = "es-BO";
    this.setFormConfiguration();

  }

  ngOnInit() {
    this.loadProductos();
  }

  setFormConfiguration() {
    this.productoService.createFormInventarioProducto(null);
  }

  goBack(): void {
    this.router.navigate([this.productosRoute]);
  }


  onSubmit(): void {
    const objProducto = this.productoService.formInventario.value;

    objProducto.idAlmacen = "F5064752-9BD6-43B6-9A33-DAD27F2238C3";
    console.log(objProducto);
      this.productoService.addProductoToAlmacen(objProducto).subscribe({
        next: (res: string): void => {
          if (res.length > 0) {
            this.productoService.createFormInventarioProducto(null);
            this.setFormConfiguration();
            this.goBack();
          }
        },
        error: err => {
        }
      });
  }

  async loadProductos(): Promise<void> {
    this.productoService.getAll().subscribe((res: any) => {
        if (res !== null) {
          this.productos = res;
          if (this.productos || this.productos > 0) {
            this.dataProductos = this.productos;
          }
        }
      }
    );
  }
}
