import {Component, signal} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {AlertService} from "../../../../alerts/alert.service";
import {enableOrDisableControls} from "../../../../helpers/FormGroupUtils";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";
import {MaterialService} from "../../services/material.service";
import {Material} from "../../interfaces/material";

@Component({
  selector: 'app-material-cform',
  templateUrl: './material-cform.component.html',
  styleUrls: ['./material-cform.component.css']
})
export class MaterialCFormComponent {
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;
  public material: Material;



  protected fieldsEstadosMateriales: object = {value: 'valor', text: 'descripcion'};


  materialsRoute = '/materiales/';

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
    public materialService: MaterialService,
  ) {
    this.material = this.materialService.form.value;
    this.locale = "es-BO";
    this.setFormConfiguration();
  }
  ngOnInit() {
  }
  setFormConfiguration(){
    if (!this.materialService.actionId) {
      this.goBack();
    }
    switch (this.materialService.actionId) {
      case enumActionsAbm.add: {
        this.materialService.initializeFormGroup(null);
        enableOrDisableControls(this.materialService.form, true);
        break;
      }
      case enumActionsAbm.view: {
        this.materialService.initializeFormGroup(this.material);
        enableOrDisableControls(this.materialService.form, false);
        break;
      }
      case enumActionsAbm.update: {
        this.materialService.initializeFormGroup(this.material);
        enableOrDisableControls(this.materialService.form, true);
        break;
      }
    }
  }
  onEdit():void{
    this.materialService.actionId = enumActionsAbm.update;
    this.setFormConfiguration();
  }
  goBack(): void {
    this.router.navigate([this.materialsRoute]);
  }
}
