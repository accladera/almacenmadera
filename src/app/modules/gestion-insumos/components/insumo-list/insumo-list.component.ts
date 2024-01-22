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
import {InsumoService} from "../../services/insumo.service";
import {Insumo} from "../../interfaces/insumo";
import {AlmacenFilter} from "../../interfaces/almacen-filter";

@Component({
  selector: 'app-insumos-list',
  templateUrl: './insumo-list.component.html',
  styleUrls: ['./insumo-list.component.css']
})
export class InsumoListComponent {
  public locale = 'es-BO';
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;

  public dataInsumos: object[];
  insumos: Insumo[] = [];
  formInsumoRoute = '/insumos/configuracion';
  public dateFormatTable?: object;
  public filterSettings: object;
  public pageSettings!: PageSettingsModel;
  public wrapSettings?: TextWrapSettingsModel;
  public toolbarOptions?: ToolbarItems[] | object;
  public searchOptions?: SearchSettingsModel;
  public filterType= 'Contains';
  searchFields = ['nombre'];
  @ViewChild('grid') grid!: GridComponent;
  protected isEmptyInsumos = true;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private alert: AlertService,
    private insumoservice: InsumoService,
    private authService: AuthService,
  ) {
    this.dataInsumos = this.insumos;
    this.locale = "es-BO";
    this.filterSettings = {type: 'Menu'};
    this.pageSettings = {pageSize: 10};

    this.toolbarOptions = ['Search', 'ExcelExport'];
    this.searchOptions = {fields: this.searchFields, ignoreCase: true, ignoreAccent: true};
    this.dateFormatTable = {type: 'dateTime', format: 'dd/MM/yyyy'};
    this.wrapSettings = {wrapMode: 'Both'};
    this.isEmptyInsumos = true;


  }

  ngOnInit(): void {
    this.onInitGetUser();
    this.loadInsumos();
    setLocalization();
  }
  onInitGetUser(){
    const id = (localStorage.getItem('userId'));
    if(id){
      this.usuarioId = localStorage.getItem('userId')!;
    }
  }
  onCreateStockInsumo(): void {
    this.insumoservice.actionId = enumActionsAbm.add;
    this.insumoservice.initializeFormGroup(null);
    this.router.navigateByUrl(this.formInsumoRoute);
  }

  onViewStockInsumo(item: Insumo): void {
    this.insumoservice.actionId = enumActionsAbm.view;
    this.insumoservice.initializeFormGroup(item);
    this.router.navigateByUrl(this.formInsumoRoute);
  }

  onDeleteStockInsumo(item: Insumo): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: `Eliminar insumo`,
        description: `¿Esta Seguro de eliminar la insumo  ${item.nombre}?`,
        type: enumDialogType.delete,
      },
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === undefined) {
        this.spinner.show();
        this.insumoservice.delete(item.idInsumo).subscribe((result: any) => {
          if (result===true) {
            this.alert.success(enumAlertText.formDeleteSuccess, enumAlertText.formTitle);
            this.insumoservice.actionId = this.enumActionsAbm.view;
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


  customizeCellInsumos(args: QueryCellInfoEventArgs): void {
    // switch ((args as any).data.tipo) {
    //   case enumTypeTransaction.income:
    //     (args as any).cell.style.color = '#07a5a1';
    //     break
    //   case enumTypeTransaction.egress:
    //     (args as any).cell.style.color = '#ff3a52';
    //     break
    // }
  }
  async loadInsumos(): Promise<void> {
    const filter: AlmacenFilter= {idAlmacen: this.usuarioId} ;
    this.insumoservice.getAllByAlmacenId(filter).subscribe({
        next: (res: any) => {
          if (res !== null) {
            this.insumos = res;
            if (this.insumos) {
              this.dataInsumos = this.insumos;
            } else {
              this.isEmptyInsumos = true;
            }
          } else {
            this.isEmptyInsumos = true;
          }

        },
        error: (err: any) => {
          this.isEmptyInsumos = true;
        }
      }
    );
  }
}
