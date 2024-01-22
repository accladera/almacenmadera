import {Component, ViewChild} from '@angular/core';
import {
  GridComponent,
  PageSettingsModel,
  QueryCellInfoEventArgs, SearchSettingsModel,
  TextWrapSettingsModel,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Producto} from "../../interfaces/producto";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerService} from "../../../../spinner/spinner.service";
import {AlertService} from "../../../../alerts/alert.service";
import {ProductoService} from "../../services/producto.service";
import {AuthService} from "../../../../auth/services/auth.service";
import {setLocalization} from "../../../../helpers/LocalizationSyncFusion";
import {enumActionsAbm} from "../../../../enums/enumActionsAbm";
import {DialogComponent} from "../../../../components/dialog/dialog.component";
import {enumDialogType} from "../../../../enums/enumDialogType";
import {enumAlertText} from "../../../../enums/enumAlertText";
import {AlmacenFilter} from "../../interfaces/almacen-filter";

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent {
  public locale = 'es-BO';
  usuarioId="";
  readonly enumActionsAbm = enumActionsAbm;

  public dataProductos: object[];
  productos: Producto[] = [];
  formProductoRoute = '/productos/configuracion';
  public dateFormatTable?: object;
  public filterSettings: object;
  public pageSettings!: PageSettingsModel;
  public wrapSettings?: TextWrapSettingsModel;
  public toolbarOptions?: ToolbarItems[] | object;
  public searchOptions?: SearchSettingsModel;
  public filterType= 'Contains';
  searchFields = ['nombre'];
  @ViewChild('grid') grid!: GridComponent;
  protected isEmptyProductos = true;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private alert: AlertService,
    private productoService: ProductoService,
    private authService: AuthService,
  ) {
    this.dataProductos = this.productos;
    this.locale = "es-BO";
    this.filterSettings = {type: 'Menu'};
    this.pageSettings = {pageSize: 10};

    this.toolbarOptions = ['Search', 'ExcelExport'];
    this.searchOptions = {fields: this.searchFields, ignoreCase: true, ignoreAccent: true};
    this.dateFormatTable = {type: 'dateTime', format: 'dd/MM/yyyy'};
    this.wrapSettings = {wrapMode: 'Both'};
    this.isEmptyProductos = true;


}

  ngOnInit(): void {
    this.onInitGetUser();
    this.loadProductos();
    setLocalization();
  }
  onInitGetUser(){
    const id = (localStorage.getItem('userId'));
    if(id){
      this.usuarioId = localStorage.getItem('userId')!;
    }
  }
  onCreateStockProducto(): void {
    this.productoService.actionId = enumActionsAbm.add;
    this.productoService.initializeFormGroup(null);
    this.router.navigateByUrl(this.formProductoRoute);
  }

  onViewStockProducto(item: Producto): void {
    this.productoService.actionId = enumActionsAbm.view;
    this.productoService.initializeFormGroup(item);
    this.router.navigateByUrl(this.formProductoRoute);
  }

  onDeleteStockProducto(item: Producto): void {
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
        this.productoService.delete(item.idProducto).subscribe((result: any) => {
          if (result===true) {
            this.alert.success(enumAlertText.formDeleteSuccess, enumAlertText.formTitle);
            this.productoService.actionId = this.enumActionsAbm.view;
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


  customizeCellProductos(args: QueryCellInfoEventArgs): void {
    // switch ((args as any).data.tipo) {
    //   case enumTypeTransaction.income:
    //     (args as any).cell.style.color = '#07a5a1';
    //     break
    //   case enumTypeTransaction.egress:
    //     (args as any).cell.style.color = '#ff3a52';
    //     break
    // }
  }
  async loadProductos(): Promise<void> {
    const filter: AlmacenFilter= {idAlmacen: this.usuarioId} ;
    this.productoService.getAllByAlmacenId(filter).subscribe({
        next: (res: any) => {
          if (res !== null) {
            this.productos = res;
            if (this.productos) {
              this.dataProductos = this.productos;
            } else {
              this.isEmptyProductos = true;
            }
          } else {
            this.isEmptyProductos = true;
          }

        },
        error: (err: any) => {
          this.isEmptyProductos = true;
        }
      }
    );
  }
}
