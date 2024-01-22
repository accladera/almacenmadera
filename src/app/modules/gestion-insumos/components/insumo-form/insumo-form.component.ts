import {Component, signal} from '@angular/core';
import {Insumo} from "../../../gestion-insumos/interfaces/insumo";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {AlertService} from "../../../../alerts/alert.service";
import {InsumoService} from "../../../gestion-insumos/services/insumo.service";
import {enableOrDisableControls} from "../../../../helpers/FormGroupUtils";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";

@Component({
  selector: 'app-insumos-form',
  templateUrl: './insumo-form.component.html',
  styleUrls: ['./insumo-form.component.css']
})
export class InsumoFormComponent {
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;
  public insumo: Insumo;



  protected fieldsEstadosInsumos: object = {value: 'valor', text: 'descripcion'};


  insumosRoute = '/insumos/';

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
    public insumoService: InsumoService,
  ) {
    this.insumo = this.insumoService.form.value;
    this.locale = "es-BO";
    this.setFormConfiguration();
  }
  ngOnInit() {
  }
  setFormConfiguration(){
    if (!this.insumoService.actionId) {
      this.goBack();
    }
    switch (this.insumoService.actionId) {
      case enumActionsAbm.add: {
        this.insumoService.initializeFormGroup(null);
        enableOrDisableControls(this.insumoService.form, true);
        break;
      }
      case enumActionsAbm.view: {
        this.insumoService.initializeFormGroup(this.insumo);
        enableOrDisableControls(this.insumoService.form, false);
        break;
      }
      case enumActionsAbm.update: {
        this.insumoService.initializeFormGroup(this.insumo);
        enableOrDisableControls(this.insumoService.form, true);
        break;
      }
    }
  }
  onEdit():void{
    this.insumoService.actionId = enumActionsAbm.update;
    this.setFormConfiguration();
  }
  goBack(): void {
    this.router.navigate([this.insumosRoute]);
  }
}
