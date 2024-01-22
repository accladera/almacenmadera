import {Component, ViewChild} from '@angular/core';
import {
  GridComponent,
  PageSettingsModel, QueryCellInfoEventArgs,
  SearchSettingsModel,
  TextWrapSettingsModel,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {AlertService} from "../../../../alerts/alert.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {setLocalization} from "../../../../helpers/LocalizationSyncFusion";
import {DialogComponent} from "../../../../components/dialog/dialog.component";
import {enumDialogType} from "../../../../enums/enumDialogType";
import {enumAlertText} from "../../../../enums/enumAlertText";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";
import {MaterialService} from "../../services/material.service";
import {Material} from "../../interfaces/material";
import {AlmacenFilter} from "../../interfaces/almacen-filter";

@Component({
  selector: 'app-material-clist',
  templateUrl: './material-clist.component.html',
  styleUrls: ['./material-clist.component.css']
})
export class MaterialCListComponent {
  public locale = 'es-BO';
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;

  public dataMateriales: object[];
  materiales: Material[] = [];
  formMaterialRoute = '/materiales/configuracion';
  public dateFormatTable?: object;
  public filterSettings: object;
  public pageSettings!: PageSettingsModel;
  public wrapSettings?: TextWrapSettingsModel;
  public toolbarOptions?: ToolbarItems[] | object;
  public searchOptions?: SearchSettingsModel;
  public filterType= 'Contains';
  searchFields = ['nombre'];
  @ViewChild('grid') grid!: GridComponent;
  protected isEmptyMateriales = true;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private alert: AlertService,
    private materialeservice: MaterialService,
    private authService: AuthService,
  ) {
    this.dataMateriales = this.materiales;
    this.locale = "es-BO";
    this.filterSettings = {type: 'Menu'};
    this.pageSettings = {pageSize: 10};

    this.toolbarOptions = ['Search', 'ExcelExport'];
    this.searchOptions = {fields: this.searchFields, ignoreCase: true, ignoreAccent: true};
    this.dateFormatTable = {type: 'dateTime', format: 'dd/MM/yyyy'};
    this.wrapSettings = {wrapMode: 'Both'};
    this.isEmptyMateriales = true;


  }

  ngOnInit(): void {
    this.onInitGetUser();
    this.loadMateriales();
    setLocalization();
  }
  onInitGetUser(){
    const id = (localStorage.getItem('userId'));
    if(id){
      this.usuarioId = localStorage.getItem('userId')!;
    }
  }
  onCreateStockMaterial(): void {
    this.materialeservice.actionId = enumActionsAbm.add;
    this.materialeservice.initializeFormGroup(null);
    this.router.navigateByUrl(this.formMaterialRoute);
  }

  onViewStockMaterial(item: Material): void {
    this.materialeservice.actionId = enumActionsAbm.view;
    this.materialeservice.initializeFormGroup(item);
    this.router.navigateByUrl(this.formMaterialRoute);
  }

  onDeleteStockMaterial(item: Material): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: `Eliminar producto`,
        description: `¿Esta Seguro de eliminar la producto  ${item.nombre}?`,
        type: enumDialogType.delete,
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === undefined) {
        this.spinner.show();
        this.materialeservice.delete(item.idMaterial).subscribe((result: any) => {
          if (result===true) {
            this.alert.success(enumAlertText.formDeleteSuccess, enumAlertText.formTitle);
            this.materialeservice.actionId = this.enumActionsAbm.view;
            this.setFormConfiguration();
            this.spinner.hide();
            (this.grid as any)?.refresh();
          }
        });
      }
    });
  }

  //#endregion AccountActions

  setFormConfiguration(): void{
    // if (!this.categoriaService.actionId) {
    //   this.categoriaService.actionId= enumActionsAbm.view;
    // }
    // this.loadCategorias();
  }




  //#region GridConfig
  clickHandlerAccountTable(args: any): void {
    // if (args.item.id === 'Click') {
    //   this.onCreateAccount();
    // }
    if (args.item.properties.id.toString().toLowerCase() === 'grid_excelexport') {
      (this.grid as any).excelExport();
    }
  }


  customizeCellMateriales(args: QueryCellInfoEventArgs): void {
    // switch ((args as any).data.tipo) {
    //   case enumTypeTransaction.income:
    //     (args as any).cell.style.color = '#07a5a1';
    //     break
    //   case enumTypeTransaction.egress:
    //     (args as any).cell.style.color = '#ff3a52';
    //     break
    // }
  }
  async loadMateriales(): Promise<void> {
    const filter: AlmacenFilter= {idAlmacen: this.usuarioId} ;
    this.materialeservice.getAllByAlmacenId(filter).subscribe({
        next: (res: any) => {
          if (res !== null) {
            this.materiales = res;
            if (this.materiales) {
              this.dataMateriales = this.materiales;
            } else {
              this.isEmptyMateriales = true;
            }
          } else {
            this.isEmptyMateriales = true;
          }

        },
        error: (err: any) => {
          this.isEmptyMateriales = true;
        }
      }
    );
  }
}
