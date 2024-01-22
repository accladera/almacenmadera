import {Component, signal} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {AlertService} from "../../../../alerts/alert.service";
import {enableOrDisableControls} from "../../../../helpers/FormGroupUtils";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";
import {Producto} from "../../interfaces/producto";
import {ProductoService} from "../../services/producto.service";
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;
  public producto: Producto;



  protected fieldsEstadosProductos: object = {value: 'valor', text: 'descripcion'};


  productosRoute = '/productos/';

  public locale = 'es-BO';
  //#region DatePickerSetting
  private month: number = new Date().getMonth();
  private fullYear: number = new Date().getFullYear();
  protected start: Date | null = new Date(this.fullYear, this.month, 1);
  protected end: Date | null = new Date(this.fullYear, this.month + 1, 0);
  protected minDate: Date = new Date(2023, 1, 1);
  protected maxDate: Date = new Date(2045, 12, 31);

  //#endregion DatePickerSetting
  onSubmit = signal<any | null>(null);
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private alert: AlertService,
    public productoService: ProductoService,
  ) {
    this.producto = this.productoService.form.value;
    this.locale = "es-BO";
    this.setFormConfiguration();
  }
  ngOnInit() {
  }
  setFormConfiguration(){
    if (!this.productoService.actionId) {
      this.goBack();
    }
    switch (this.productoService.actionId) {
      case enumActionsAbm.add: {
        this.productoService.initializeFormGroup(null);
        enableOrDisableControls(this.productoService.form, true);
        break;
      }
      case enumActionsAbm.view: {
        this.productoService.initializeFormGroup(this.producto);
        enableOrDisableControls(this.productoService.form, false);
        break;
      }
      case enumActionsAbm.update: {
        this.productoService.initializeFormGroup(this.producto);
        enableOrDisableControls(this.productoService.form, true);
        break;
      }
    }
}
  onEdit():void{
    this.productoService.actionId = enumActionsAbm.update;
    this.setFormConfiguration();
  }
  goBack(): void {
    this.router.navigate([this.productosRoute]);
  }
}
